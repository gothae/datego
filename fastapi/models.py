from decimal import Decimal
from typing import List
from pydantic import BaseModel

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

class SelectItem(BaseModel):
    course: list
    categoryList: dict
    price: int