import pandas as pd
from math import log
from surprise import Reader, Dataset
from surprise import KNNBasic
from surprise import Dataset
from surprise import accuracy
from surprise.model_selection import train_test_split
from surprise.dataset import DatasetAutoFolds
from collections import defaultdict
from sklearn.metrics.pairwise import cosine_similarity
from itertools import chain

RESTAURANT_TAGS = [i for i in range(25,38)]
CAFE_TAGS = [i for i in range(1,13)] + [45]
DRINK_TAGS = [i for i in range(13,25)]
ACTIVITY_TAGS = [i for i in range(38,45)]
COURSE_TAGS = [RESTAURANT_TAGS, CAFE_TAGS, DRINK_TAGS, ACTIVITY_TAGS]

#식당과 놀거리 경우, 카테고리 선택하므로 분류해주기
def category_filter(dataFrame, spot_category_detail, categories):
    data = []
    for idx, row in dataFrame.iterrows():
        spot_id = row['id']
        spot_categories = spot_category_detail[spot_category_detail['spot_id'] == spot_id]['category_detail_id'].values.tolist()
        for category in categories:
            if category in spot_categories:
                data.append(row)
    return pd.DataFrame(data)

#해당 구역만 분류해주기
def dong_filter(dataFrame, dong):
    data = []
    area = [
        [1],
        [2],
        [3],
        [4],
        [5],
        [6,7,8,9],
        [10,11,12,13,14,15,16,17],
        [18,19,20,21,22,23,24]
    ]
    areaIdx = -1
    for i in range(len(area)):
        if dong in area[i]:
            areaIdx = i
            break

    for idx, row in dataFrame.iterrows():
        if row['dong_id'] in area[areaIdx]:
            data.append(row)
    return pd.DataFrame(data)

def price_filter(spots, menus, course, price):
    data = []
    for idx, row in spots.iterrows():
        spotId = row['id']
        menu_price = menus[menus['spot_id'] == spotId]
        avg = 0
        for j, menu_row in menu_price.iterrows():
            avg += menu_row['price']
        if len(menu_price) == 0:
            pass
        else:
            avg /= len(menu_price)

        if course == 1 or course == 3:
            if avg <= price  * 0.5:
                data.append(row)
        elif course == 2:
            if avg <= price  * 0.3:
                data.append(row)
    return pd.DataFrame(data)

#식당과 놀거리 경우, 태그선택안하므로 유저리뷰 기준으로 좋아하는 태그를 뽑는다
def tagsFromReviews(my_reviews, spot_courses, course):
    dict = {}
    if len(my_reviews) == 0:
        return COURSE_TAGS[course-1]

    tags = COURSE_TAGS[course-1]
        
    for idx, row in my_reviews.iterrows():
        spotId = row['spot_id']
        spot_course = spot_courses[spot_courses['id'] == spotId] #spot 한개
        #같은 코스아니면 제외
        if spot_course['category_id'].values[0] != course:
            continue
        rating = row['rate']

        # 해당 store의 가장 많은 리뷰태그 5개
        store_reviews = []
        for tag in tags:
            store_reviews.append([tag,int(spot_course[tag].values[0])])
        store_reviews.sort(key = lambda x: x[1], reverse=True)

        for tag, cnt in store_reviews[:5]:
            if tag not in dict.keys():
                dict[tag] = 0
            if cnt != 0:
                dict[tag] += rating        
    
    sorted_dict = sorted(dict.items(), key=lambda x : x[1], reverse=True)
    return [tag[0] for tag in sorted_dict[:3]]

def tf(t, d):
    # d => 인덱스의 태그들, t => 태그 하나
    return d.count(t)

def idf(spot, t):
    df = 0
    # 전체 태그들중에 해당 태그가 몇번 사용됐는디 로그로
    df += sum(spot[t].values)
    return log(len(spot)/(df+1))

def tfidf(spot, t, d, i):
    # tf는 정의대로 수정
    return spot[t][i] * idf(spot, t)

def compute_cos_sim(spots, arr):
    cosine_matrix = cosine_similarity(arr, arr)
    spotId = {}
    for idx, c in enumerate(spots['name']):  spotId[idx] = c
    id2spot = {}
    for idx, c in spotId.items() : id2spot[c] = idx
    return cosine_matrix, spotId, id2spot

def get_k_sim(name, k, cosine_matrix, id2spot, spots):
    idx = id2spot[name]
    
    sim_scores = []

    for i in range(len(spots)):
        spot = spots.iloc[i]
        c = spot['count'] if spot['count'] < 100 else 100
        c += spot['rate'] * 20
        score = [spot['id'], c/200 + cosine_matrix[idx][i]]
        score[1] *= 2.5
        sim_scores.append(score)

    # sim_scores = [(i, c + compute_score(i, spots) ) for i, c in enumerate(cosine_matrix[idx]) if i != idx]
    sim_scores = sorted(sim_scores, key=lambda x:x[1], reverse = True)
    return sim_scores[1:k+1]

def get_top_n(predictions, n=10):
    # First map the predictions to each user.
    top_n = defaultdict(list)
    for uid, iid, true_r, est, _ in predictions:
        top_n[uid].append((iid, est))

    # Then sort the predictions for each user and retrieve the k highest ones.
    for uid, user_ratings in top_n.items():
        user_ratings.sort(key=lambda x: x[1], reverse=True)
        top_n[uid] = user_ratings[:n]

    return top_n

def make_uid_iid_list(uid, dongId, spots):
    uid_iid_list = []
    for idx, r in spots.iterrows():
        if r['dong_id'] == dongId:
            uid_iid_list.append([uid, r['id'], None])
    return uid_iid_list


def get_k_spot_by_cf(k, pred, spots):
    top_n = get_top_n(pred, n=k)
    k_spot_by_cf = {}
    for uid, user_ratings in top_n.items():
        for (iid, est) in user_ratings:
            k_spot_by_cf[spots[spots['id']==iid]['id'].item()] = est                
    return k_spot_by_cf

def train_model(reviews):
    reader = Reader(rating_scale=(1, 5.0))
    data = Dataset.load_from_df(reviews[['user_id', 'spot_id', 'rate']], reader)

    trainset = data.build_full_trainset()

    option = {'name':'pearson', 'user_based':True}
    algo = KNNBasic(sim_options=option)

    algo.fit(trainset)
    return algo

def rec_spot(cbf_return, cf_return):
    recspots = []
    rec_for_user = defaultdict(list)
    for k, v in chain(cbf_return.items(), cf_return.items()):
        rec_for_user[k].append(v)

    for k, v in rec_for_user.items():
        rec_for_user[k] = sum(v)
        
    rec_for_user = sorted(rec_for_user.items(), key=lambda x : x[1], reverse=True)
    for recspot in rec_for_user[:20]:
        recspots.append(recspot)
    return recspots