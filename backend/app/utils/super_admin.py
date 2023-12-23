from fastapi_sqlalchemy import db
from backend.app.models.models import Users
from fastapi import HTTPException
import os
import random

def choose_avatar(gender):
    decode = {0: "males",
              1: "females",
              2: "others"}
    base_path = os.path.join("backend","app","assets","avatars")
    image = random.choice(os.listdir(os.path.join(base_path, decode[gender])))

    return image

def create_user(data):
    
    user = db.session.query(Users).filter(Users.primary_email == data.primary_email).first()
    if user:
        raise HTTPException(status_code=409, detail="Email id already in use")
    else:
        try:
            avatar = choose_avatar(data.gender)
            user = Users(username=data.username,
                         name=data.name,
                         password=data.password,
                         gender=data.gender,
                         user_type=0,
                         primary_email=data.primary_email,
                         profile_pic = avatar)
            
            db.session.add(user)
            db.session.commit()
        except:
            raise HTTPException(status_code=500, detail="Registration unsuccessful! Please try again.")

def change_role(user_id, user_type):

    user = db.session.query(Users).filter(Users.id == user_id).first()
    if user:
        if int(user_type) < 5:
            user.user_type = int(user_type)
            db.session.commit()
        else:
            raise HTTPException(status_code=400, detail="Not a valid user type.")
    else:
        raise HTTPException(status_code=400, detail="Not a valid user id.")
