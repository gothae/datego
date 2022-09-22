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


class Item(BaseModel):
    food: Optional[list] =[]
    cafe: Optional[list] =[]
    drink: Optional[list] =[]
    play: Optional[list] =[]


class Res (BaseModel):
    code: int
    message: str
    responseData: list= []


class Spot(list):
    id: int
    address: str
    latitude: Decimal
    longtitude: Decimal
    name: str
    quest: str
    rate: float
    phone: str

    def __init__(self, arr={1,2,3,4,5,6,7,8,9,10}):

        self.id = arr[0]
        self.address = arr[1]
        self.latitude = arr[2]
        self.longtitude = arr[3]
        self.name = arr[4]
        self.quest = arr[5]
        self.rate = arr[6]
        self.phone = arr[8]

    def __str__(self):
        return {"id": self.id, "address": self.address, "latitude": self.latitude, "longtitude":self.longtitude, "name" : self.name, "quest":self.quest, "rate":self.rate, "phone":self.phone}

app = FastAPI()


# user_spot = 유저 장소 평가 내역, spot_courses = 장소 태그 평가 내역
@app.get("/courses")
async def get_courses(response_model=Res):
    spot_tag = pd.read_sql_table('spot_tag', connection)
    print(spot_tag)
    spot_tag_pivot = spot_tag.pivot(index='spot_id', columns='tag_id', values='count')
    print(spot_tag_pivot)
    query = sql.select([sql.column("id"), sql.column("category_id"), sql.column("rate")]).select_from(sql.table('spot'))
    spot = pd.read_sql(query, connection)
    print(spot)
    spot_courses = pd.merge(spot_tag_pivot, spot, left_on='spot_id', right_on='id', how='inner')
    print(spot_courses)
    user_spot_query = sql.select([sql.column("user_id"), sql.column("spot_id"), sql.column("rate")]).select_from(sql.table('user_spot'))
    user_spot = pd.read_sql(user_spot_query, connection)
    print(user_spot)
    table = db.Table('spot', metadata, autoload=True, autoload_with=engine)
    ids = [1,2,3,4,5,6,7,8,9,10]
    for i in ids:
        spot_query = db.select([table]).where(table.columns.id == '1')
        result_proxy = connection.execute(spot_query)
        result = result_proxy.fetchall()
        response = {}
        spot = Spot(result[0])
        print(json.dumps(spot))
        print(spot.id)
        spots = list
        spots.append(Spot(result[0]))

    response.update({"Spot": spots})
    print(response)



    ## 추천알고리즘으로 나온 id 20개

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

    courses = [
        {
            "spots": [
                {
                    "id":1,

                }
            ]
        }
    ]
    a = {200, "SUCCESS", "HI"}


    return a
