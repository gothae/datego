from fastapi import FastAPI
import sqlalchemy as db
import json
from sqlalchemy import sql
from typing import Optional
from pydantic import BaseModel
from decimal import Decimal
from fastapi.encoders import jsonable_encoder
import numpy as np
import pandas as pd
from pandas import DataFrame

engine = db.create_engine("mysql+pymysql://root:1234@localhost:3306/datego", echo=True, future=True)
connection = engine.connect()
metadata = db.MetaData()

class Spot(list):
    id: int
    address: str
    latitude: Decimal
    longtitude: Decimal
    name: str
    quest: str
    rate: float
    phone: str
    price = int
    image = str
    tags: list = []

    def setValue(self, arr, price, image):
        self.tags = arr
        self.price = price
        self.image = image

    def __init__(self, arr):

        self.id = arr[0]
        self.address = arr[1]
        self.latitude = arr[2]
        self.longtitude = arr[3]
        self.name = arr[4]
        self.quest = arr[5]
        self.rate = arr[6]
        self.phone = arr[8]

    def __str__(self):
        return {"id": self.id, "address": self.address, "latitude": self.latitude, "longtitude": self.longtitude, "name": self.name, "image": self.image,
                "quest": self.quest, "rate": self.rate, "phone": self.phone, "tags": self.tags, "price": self.price}


app = FastAPI()


# user_spot = 유저 장소 평가 내역, spot_courses = 장소 태그 평가 내역
@app.get("/courses")
async def get_courses():
    spot_tag = pd.read_sql_table('spot_tag', connection)
    print(spot_tag)
    spot_tag_pivot = spot_tag.pivot(index='spot_id', columns='tag_id', values='count')
    # spot 별 태그종류 및 개수
    print(spot_tag_pivot)
    query = sql.select([sql.column("id"), sql.column("category_id"), sql.column("rate")]).select_from(sql.table('spot'))
    spot = pd.read_sql(query, connection)
    # spot = 가게 id , 카테고리 id, 평점
    print(spot)
    spot_courses = pd.merge(spot_tag_pivot, spot, left_on='spot_id', right_on='id', how='inner')
    # spot별 id, 태그 종류 및 수, 카테고리 id ,평점
    print(spot_courses)

    user_spot_query = sql.select([sql.column("user_id"), sql.column("spot_id"), sql.column("rate")]).select_from(sql.table('user_spot'))
    user_spot = pd.read_sql(user_spot_query, connection)
    # 유저가 방문한 지역을 평가 userid, spotid, rate
    print(user_spot)

    table = db.Table('spot', metadata, autoload=True, autoload_with=engine)
    category_table = db.Table('category', metadata, autoload=True, autoload_with=engine)
    menu_table = db.Table('menu', metadata, autoload=True, autoload_with=engine)
    tag_table = db.Table('tag',  metadata, autoload=True, autoload_with=engine)
    image_table = db.Table('image', metadata, autoload=True, autoload_with=engine)
    # 예시
    # 첫코스로 보여줄거
    ids = [1, 1, 1, 1, 1]
    spots = list()
    response = {}
    for i in ids:
        spot_query = db.select([table]).where(table.columns.id == i)
        result_proxy = connection.execute(spot_query)
        result = result_proxy.fetchall()

        j = result[0][8]
        category_query = db.select([category_table]).where(category_table.columns.id == j)
        category_result_proxy = connection.execute(category_query)
        category_result = category_result_proxy.fetchall()

        price_query = db.select([menu_table]).where(menu_table.columns.spot_id == i)
        price_result_proxy = connection.execute(price_query)
        price_result = price_result_proxy.fetchall()

        image_query = db.select([image_table.columns.image_link]).where(image_table.columns.spot_id==i)
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
            tag_query = db.select([tag_table.columns.name]).where(tag_table.columns.id == z[3])
            tag_result_proxy = connection.execute(tag_query)
            tag_result = tag_result_proxy.fetchall()
            tags.append(tag_result[0][0])

        spot.setValue(tags, price_result[0][2], image_result[0][0])
        spots.append(spot.__str__())

    # 코스를 (음식-카페-음식-놀것) 최대 20개의 index가 들어간다.
    spotIds=[
        {
            "first": [1,2,3,4,5,6,7,8,9,10]
        },
        {
            "second": [1,21,23,6,9,12,22]
        },
        {
            "third":[1,23,4,5,66,7,8,9,10]
        }
    ]
    response.update({"code": 200})
    response.update({"message": "SUCCESS"})

    responseData = {}
    responseData.update({"Spots": spots})
    responseData.update({"spotIds": spotIds})
    response.update({"responseData": responseData})

    return response
