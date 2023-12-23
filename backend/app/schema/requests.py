from fastapi import File, UploadFile, Form
from pydantic import BaseModel
from datetime import date

class Register(BaseModel):
    username: str
    name: str
    password: str
    gender: int
    primary_email: str

    class Config:
        orm_mode = True

class Login(BaseModel):
    email: str
    password: str

class ForgetPassword(BaseModel):
    email: str
    new_password: str

class User(BaseModel):
    username: str 
    name: str 
    # password: str
    gender: int
    user_type: int
    secondary_email: str
    level: int
    status: bool
    dob: date
    address: str
    city: str
    state: str 
    pincode: str
    country: str
    contact: str
    profile_pic: str


class Course(BaseModel):
    name: str
    description: str
    duration: int
    course_credit: int
    is_project: bool
    status: bool
    level: int

class AddCourse(BaseModel):
    name: str
    description: str
    course_id: str
    duration: int
    course_credit: int
    is_project: bool
    status: bool
    level: int

class Feedback(BaseModel):
    feedback: str
    rating: int

class RecommendPaths(BaseModel):
    n_hours: int
