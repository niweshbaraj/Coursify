from fastapi_sqlalchemy import db
from backend.app.models.models import Users, Background, Courses, User_Courses
from backend.app.auth.auth_handler import encodeJWT, decodeJWT
from fastapi import HTTPException
import base64
import os, json, datetime
import random

def serialize_datetime(obj): 
    if isinstance(obj, datetime.datetime): 
        return obj.isoformat() 
    raise TypeError("Type not serializable") 

def check_user_type(token):
    email = decodeJWT(token)['email']
    user = db.session.query(Users).filter(Users.primary_email == email).first()
    if user:
        return user.user_type
    else:
        raise HTTPException(status_code=403, detail="Unauthorized token!")

def choose_avatar(gender):

    decode = {0: "males",
              1: "females",
              2: "others"}
    base_path = os.path.join("backend","app","assets","avatars")
    image = random.choice(os.listdir(os.path.join(base_path, decode[gender])))

    return image

def encode_img(path):
    with open(path, mode='rb') as file:
        img = file.read()
    return base64.b64encode(img).decode('utf-8')

def get_profilepic(image):
    if "female" in image:
        profilepic_path=os.path.join("backend","app","assets","avatars","females",image)
    elif "male" in image:
        profilepic_path=os.path.join("backend","app","assets","avatars","males",image)
    elif "other" in image:
        profilepic_path=os.path.join("backend","app","assets","avatars","others",image)
    else:
        profilepic_path=os.path.join("backend","app","assets","profile_pics",image)
    return encode_img(profilepic_path)

def check_user(email):
    user = db.session.query(Users).filter(Users.primary_email == email).first()
    if user:
        return True
    return False

def login_user(data):

    email = data.email
    password = data.password
    user = db.session.query(Users).filter(Users.primary_email == email).first()
    if user:
        if user.password == password:
            return {"id": user.id,
                    "type": user.user_type,
                    "token": encodeJWT(user.primary_email)}
        else:
            raise HTTPException(status_code=401, detail="Wrong Credentials")
    else:
        raise HTTPException(status_code=401, detail="Wrong Credentials")

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
                         user_type=1,
                         primary_email=data.primary_email,
                         profile_pic = avatar)
            
            db.session.add(user)
            db.session.commit()
        except:
            raise HTTPException(status_code=500, detail="Registration unsuccessful! Please try again.")

def change_password(data):

    user = db.session.query(Users).filter(Users.primary_email == data.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="User doesn't exist.")
    try:
        user.password = data.new_password
        db.session.commit()
    except:
        raise HTTPException(status_code=400, detail="Something went wrong.")

def get_enrolled_and_completed_courses(user_id):
    user_courses = db.session.query(User_Courses).filter(User_Courses.user_id == user_id).all()
    enrolled_courses, completed_courses = [], []

    for course in user_courses:
        course_details = db.session.query(Courses).filter(Courses.id == course.course_id).first()
        if course.status == 0:
            enrolled_courses.append({
                "id": course_details.id,
                "course_id": course_details.course_id,
                "name": course_details.name,
                "level": course_details.level
            })
        elif course.status == 1:
            completed_courses.append({
                "id": course_details.id,
                "course_id": course_details.course_id,
                "name": course_details.name,
                "level": course_details.level
            })
    
    return enrolled_courses, completed_courses

def get_user(user_id):

    user = db.session.query(Users).filter(Users.id == user_id).first()
    if user:
        background = db.session.query(Background).filter(Background.user_id == user.id).first()
        enrolled_courses, completed_courses = get_enrolled_and_completed_courses(user.id)

        d = {
                "username": user.username,
                "name": user.name,
                "gender": user.gender,
                "user_type": user.user_type,
                "primary_email": user.primary_email,
                "secondary_email": user.secondary_email,
                "dob": json.dumps(user.dob, default=serialize_datetime),
                "address": user.address,
                "city": user.city,
                "state": user.state,
                "pincode": user.pincode,
                "country": user.country,
                "contact": user.contact,
                "profile_pic": get_profilepic(user.profile_pic),
                "college": background.college if background else None,
                "discipline": background.discipline if background else None,
                "completion_year": background.completion_year if background else None,
                "college_address": background.address if background else None,
                "college_city": background.city if background else None,
                "college_state": background.state if background else None,
                "college_pincode": background.pincode if background else None,
                "country": background.country if background else None,
                "employment_status": background.employment_status if background else None,
                "enrolled_courses": enrolled_courses,
                "completed_courses": completed_courses
            }
        return d

def logout_user():
    return

def update_user(user_id, data, profile_pic):
    user = db.session.query(Users).filter(Users.id == user_id).first()
    if user:
        user.username=data.username
        user.name=data.name
        user.password=data.password
        user.gender=data.gender
        user.user_type=data.user_type
        user.secondary_email=data.secondary_email
        user.level=data.level
        user.status=data.status
        user.dob=data.dob
        user.address=data.address
        user.city=data.city
        user.state=data.state
        user.pincode-data.pincode
        user.country=data.country
        user.contact=data.contact

        profile_pics_path = os.path.join('backend','app','assets','profile_pics')
        profile_pic.save(os.path.join(profile_pics_path, user.username+".png"))
        user.profile_pic=user.username+".png"
        db.session.commit()

        return True
    raise HTTPException(status_code=400, detail="Something went wrong.")


    