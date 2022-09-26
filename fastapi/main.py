from fastapi import FastAPI
import sqlalchemy as db
from sqlalchemy import sql
from fastapi.encoders import jsonable_encoder
import pandas as pd
from models import Spot, SelectItem
import recommend
from collections import defaultdict

engine = db.create_engine("mysql+pymysql://root:ghdtjrdls7777@j7a104.p.ssafy.io:3336/datego", echo=True, future=True)
connection = engine.connect()
metadata = db.MetaData()


app = FastAPI()

# DATABASE TABLE
SPOT_TABLE = db.Table('spot', metadata, autoload=True, autoload_with=engine)
CATEGORY_TABLE = db.Table('category', metadata, autoload=True, autoload_with=engine)
MENU_TABLE = db.Table('menu', metadata, autoload=True, autoload_with=engine)
TAG_TABLE = db.Table('tag',  metadata, autoload=True, autoload_with=engine)
IMAGE_TABLE = db.Table('image', metadata, autoload=True, autoload_with=engine)

# user_spot = 유저 장소 평가 내역, spot_courses = 장소 태그 평가 내역
@app.get("/courses/{dong}")
async def get_courses(dong:int , req:SelectItem):
    #spot_tag : spot별로 어떤 태그에 count 어떻게 있는지 이루어진 테이블
    # DB테이블형식으로 나옵니다
    spot_tag = pd.read_sql_table('spot_tag', connection)

    # spot_category_detail 테이블
    # DB테이블형식으로 나옵니다
    spot_category_detail = pd.read_sql_table('spot_category_detail', connection)

    # DB테이블형식으로 나옵니다
    spot_category_detail = pd.read_sql_table('spot_category_detail', connection)

    #spot_tag_pivot: spot 별 태그종류 및 개수,,관련없는 카테고리의 태그 값들은 NaN
    spot_tag_pivot = spot_tag.pivot(index='spot_id', columns='tag_id', values='count')  

    # spot 테이블
    spot = pd.read_sql_table('spot', connection)

    # menu 테이블
    menus = pd.read_sql_table('menu', connection)

    # 태그 종류 및 수, spot별 id, category_id, rate
    # 1 2 .. 44 spot_id category_id, rate 형식으로 나옵니다
    spot_courses = pd.merge(spot_tag_pivot, spot, left_on='spot_id', right_on='id', how='inner')

    user_spot_query = sql.select([sql.column("user_id"), sql.column("spot_id"), sql.column("rate")]).select_from(sql.table('user_spot'))
    # 유저가 방문한 지역을 평가 userid, spotid, rate
    # userid, spotid, rate 형식으로 나옵니다
    user_spot = pd.read_sql(user_spot_query, connection)

    # 1. 동 선택
    # dong

    # 2. 코스 선택 (식당/카페/술집/활동)
    courses = req.course
    
    # 3. 카테고리 / 태그 선택
    categories = req.categoryList # 어느 카테고리/태그를 선택했는가

    # 4. 가격 선택
    price = req.price

    # 5. userId 가져오기
    userId = 1

    # 리턴값
    ids = []
    recommends = []
    orders = ["first","second","third",'fourth','fifth']
    response = {}

    for course in courses:
        courseTags = recommend.COURSE_TAGS[course-1] #선택된 코스의 태그들
        spots = spot[spot['category_id'] == course] # 선택된 코스에 맞는 데이터만 불러오기
        selectedTags = []

        # 식당/활동의 경우 유저리뷰로부터 태그뽑아야함
        if course == 1 or course == 4:
            selectedTags = recommend.tagsFromReviews(user_spot[user_spot['user_id'] == userId], spot_courses, course)
        else:
            selectedTags = categories

        # 식당/활동의 경우 카테고리 분류
        if course == 1:
            spots = recommend.category_filter(spots, spot_category_detail ,categories['food'])
        elif course == 4:
            spots = recommend.category_filter(spots, spot_category_detail ,categories['play'])
        
        # 동 분류
        spots = recommend.dong_filter(spots, dong)

        # 가격 분류
        spots = recommend.price_filter(spots, menus, course, price)

        # spots DataFrame에 태그들 열로 달아주기
        temp = {}
        for idx, row in spots.iterrows():
            for t in courseTags:
                count = spot_tag[(spot_tag['spot_id'] == row['id']) & (spot_tag['tag_id'] == t)]['count'].values[0]
                if t not in temp.keys():
                    temp[t] = []
                temp[t].append(count)
        for k,v in temp.items():
            spots[k] = v

        # TF-IDF
        result = []
        for i in spots.index:
            result.append([])
            d = spots['id'][i]
            for j in range(len(courseTags)):
                t = courseTags[j]
                result[-1].append(recommend.tfidf(spots, t, d, i))
        
        # TF-IDF
        result = []
        for i in spots.index:
            result.append([])
            d = spots['id'][i]
            for j in range(len(courseTags)):
                t = courseTags[j]
                res = recommend.tfidf(spots, t, d, i)
                if isinstance(res, pd.Series):
                    res = res.values[0]
                result[-1].append(res)

        tfidf_ = pd.DataFrame(result, columns=courseTags)

        N = len(spots)
        temp = []
        for tag in courseTags:
            temp.append(1 if tag in selectedTags else 0)
        
        tfidf_.loc[N] = temp

        temp = [-1,'','','','temp','','',5,course,dong,1] + temp
        spots.loc[N] = temp
        N += 1

        #코사인 유사도 구하기
        cosine_matrix, spotId, id2spot = recommend.compute_cos_sim(spots, tfidf_)
        # spotId : {0: '단박왕돈까스', 1: '일미감자탕', ...}
        cbf_return = recommend.get_k_sim("temp", 1000, cosine_matrix, id2spot, spots)
        cbf_return = dict(cbf_return)
        # cbf_return : [[spotid,점수], [spotid,점수], ... ]

        # 모델 학습
        reviews = user_spot[['user_id', 'spot_id', 'rate']]
        cf_model = recommend.train_model(reviews)

        # 가게 리스트 생성
        uid_iid_list = recommend.make_uid_iid_list(userId, dong, spots[:-1])

        # cf 기반 가게 1000개의 점수 구하기 (1, 5.0)
        pred = cf_model.test(uid_iid_list)
        cf_return = recommend.get_k_spot_by_cf(1000, pred, spots[:-1])

        # cbf 점수, cf 점수 합치고 sort 후 20개 리턴
        recspots20 = recommend.rec_spot(cbf_return, cf_return)
        print(recspots20)
        temp = [k[0] for k in recspots20]
        recommends.append(temp)
        ids.append(recspots20[0][0])

    # 예시
    # 첫코스로 보여줄거
    print("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    print(recommends)
    spots = list()
    response = {}
    for i in ids:
        spot_query = db.select([SPOT_TABLE]).where(SPOT_TABLE.columns.id == i)
        result_proxy = connection.execute(spot_query)
        result = result_proxy.fetchall() #spot 테이블에서 해당 id인 spot 찾은거

        j = result[0][8] #category_id
        category_query = db.select([CATEGORY_TABLE]).where(CATEGORY_TABLE.columns.id == j)
        category_result_proxy = connection.execute(category_query)
        category_result = category_result_proxy.fetchall()

        price_query = db.select([MENU_TABLE]).where(MENU_TABLE.columns.spot_id == i)
        price_result_proxy = connection.execute(price_query)
        price_result = price_result_proxy.fetchall()
        # pk, menu이름, 가격, spotid

        image_query = db.select([IMAGE_TABLE.columns.image_link]).where(IMAGE_TABLE.columns.spot_id==i)
        image_result_proxy = connection.execute(image_query)
        image_result = image_result_proxy.fetchall()

        spot = Spot(result[0])

        tags = list()
        tags.append(category_result[0][1])
        spot_tag_filter = (spot_tag.spot_id == i)
        tag_data = spot_tag.loc[spot_tag_filter, :]
        tag_data = tag_data.sort_values(by=['count']).head(3)

        tag_data_list = tag_data.values.tolist()

        for z in tag_data_list:
            tag_query = db.select([TAG_TABLE.columns.name]).where(TAG_TABLE.columns.id == z[3])
            tag_result_proxy = connection.execute(tag_query)
            tag_result = tag_result_proxy.fetchall()
            tags.append(tag_result[0][0])

        spot.setValue(tags, price_result[0][2], "image_result[0][0]")
        spots.append(spot.__str__())

    # 코스를 (음식-카페-음식-놀것) 최대 20개의 index가 들어간다.
    spotIds = {}
    for i in range(len(recommends)):
        spotIds[orders[i]] = recommends[i]

    # spotIds=[
    #     {
    #         "first": [1,2,3,4,5,6,7,8,9,10]
    #     },
    #     {
    #         "second": [1,21,23,6,9,12,22]
    #     },
    #     {
    #         "third":[1,23,4,5,66,7,8,9,10]
    #     }
    # ]
    response.update({"code": 200})
    response.update({"message": "SUCCESS"})

    responseData = {}
    responseData.update({"Spots": spots})
    responseData.update({"spotIds": spotIds})
    response.update({"responseData": responseData})

    return response
