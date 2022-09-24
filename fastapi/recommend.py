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
import os

restaurants = []
cafes = []
drinks = []
activities = []

# 1번 유저
my_uid = 1


RESTAURANT_TAGS = [i for i in range(25,38)]
CAFE_TAGS = [i for i in range(1,13)]
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

# 식당: 1, 카페: 2, 술집: 3, 활동: 4
def getWhichCourse():
    return 2

# 식당/홛동이면 어느 카테고리 => 태그로 변환해주기
# 카페/술집이면 어느 태그
def getUserSelects():
    # return ['한식','양식']
    return ['분위기좋은', '사진찍기좋은', '깔끔한']

#어느 동을 선택했는지
def getDong():
    return '이태원동'

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

def compute_score(idx):
    if spots['count'][idx] > 100 : c = 100
    else : c = spots['count'][idx]
    return (c + spots['rating'][idx]*20)/200

def compute_cos_sim(spots, arr):
    cosine_matrix = cosine_similarity(arr, arr)
    spotId = {}
    for idx, c in enumerate(spots['name']):  spotId[idx] = c
    id2spot = {}
    for idx, c in spotId.items() : id2spot[c] = idx
    return cosine_matrix, spotId, id2spot

def get_k_sim(name, k):
    idx = id2spot[name]
    k_spot_by_cbf = {}
    sim_scores = [(i, c + compute_score(i) ) for i, c in enumerate(cosine_matrix[idx]) if i != idx]
    sim_scores = sorted(sim_scores, key=lambda x:x[1], reverse = True)
    for i, score in sim_scores[0:k]:
        k_spot_by_cbf[spotId[i]] = score * 2.5
    return k_spot_by_cbf

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

def make_uid_iid_list(uid, dongId):
    uid_iid_list = []
    for idx, r in cafes.iterrows():
        if r['addr2'] == dongId:
            uid_iid_list.append([my_uid, r['store_id'], None])
    return uid_iid_list

def get_k_spot_by_cf(k):
    top_n = get_top_n(pred, n=k)
    k_spot_by_cf = {}
    for uid, user_ratings in top_n.items():
        for (iid, est) in user_ratings:
            k_spot_by_cf[cafes[cafes['store_id']==iid]['name'].item()] = est                
    return k_spot_by_cf

# # 1. 동 선택
# dong = getDong()

# # 2. 코스 선택 (식당/카페/술집/활동)
# course = getWhichCourse()
# courseTags = COURSE_TAGS[course-1]

# # 3. 카테고리 / 태그 선택
# categories = getUserSelects() # 어느 카테고리/태그를 선택했는가
# selectedTags = []
# if course == 1 or course == 4:
#     selectedTags = tagsFromReviews(2, course)
# else:
#     selectedTags = categories

# # 4. 선택된 코스에 맞는 데이터 불러오기
# spots = cafes

# # 5. spot 분류
# if course == 1 or course == 4: # 식당/활동의 경우 카테고리로 분류
#     spots = category_filter(restaurants, categories) 
# spots = dong_filter(spots, dong) # 어느동을 선택했는지
# spots.reset_index(inplace=True, drop=True)

# # 6. TF-IDF 구하기
# result = []
# for i in spots.index:
#     result.append([])
#     d = spots['name'][i]
#     for j in range(len(courseTags)):
#         t = courseTags[j]
#         result[-1].append(tfidf(spots, t, d, i))

# tfidf_ = pd.DataFrame(result, columns=courseTags)

# # 선택된 태그는 1, 아니면 0으로 TF-IDF data frame에 넣어주기
# N = len(spots)
# temp = []
# for tag in courseTags:
#     if tag in selectedTags:
#         temp.append(1)
#     else:
#         temp.append(0)

# tfidf_.loc[N] = temp
# if course == 1 or course == 4: # 식당 / 활동
#     temp = ['','temp','','','','','','','','',5,1] + temp + [''] 
# else: # 카페 / 술집
#     temp = ['','','temp','','','','','','','',5,1] + temp + ['']
# spots.loc[N] = temp
# N += 1

# # 코사인 유사도 구하기
# cosine_matrix, spotId, id2spot = compute_cos_sim(spots, tfidf_)

# cbf_return = get_k_sim("temp",1000)



# # CF
# reviews = reviews[['user_id', 'store_id', 'rating']]
# cafes = cafes[['store_id','category_id','name','addr2','rating','count','가성비좋은','분위기좋은','감성카페','고급스러운','조용한',
#     '깔끔한','디저트','인테리어','사진찍기좋은','이색적인','뷰가좋은','예쁜','동네핫플']]

# reader = Reader(rating_scale=(1, 5.0))
# data = Dataset.load_from_df(reviews[['user_id', 'store_id', 'rating']], reader)

# trainset = data.build_full_trainset()

# option = {'name':'pearson', 'user_based':True}
# algo = KNNBasic(sim_options=option)

# algo.fit(trainset)

# uid_iid_list = make_uid_iid_list(my_iid, dong)
# pred = algo.test(uid_iid_list)
# cf_return = get_k_spot_by_cf(1000)

# rec_for_user = defaultdict(list)
# for k, v in chain(cbf_return.items(), cf_return.items()):
#     rec_for_user[k].append(v)

# for k, v in rec_for_user.items():
#     rec_for_user[k] = sum(v)
    
# rec_for_user = sorted(rec_for_user.items(), key=lambda x : x[1], reverse=True)
# for recspot in rec_for_user[:20]:
#     print(recspot[0])