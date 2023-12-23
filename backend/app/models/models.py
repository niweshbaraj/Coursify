from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Boolean, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy_utils import create_database, database_exists
from dotenv import load_dotenv, find_dotenv
import os

_ = load_dotenv(find_dotenv())
DB_PASSWORD = os.getenv('DB_PASSWORD')
HOST = os.getenv('HOST')
PORT = os.getenv('PORT')

Base = declarative_base()

class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key = True, index = True)
    username = Column(String, nullable = False, unique = True)
    name = Column(String, nullable = False)
    password = Column(String, nullable = False)
    gender = Column(Integer, nullable = False) # handle only 3 values constraint
    user_type = Column(Integer, nullable = False) # handle only 4 values constraint
    primary_email = Column(String, nullable = False)
    secondary_email = Column(String, nullable = True)
    cgpa = Column(Float, nullable = True)
    level = Column(Integer, nullable = True) # Foundation, diploma, degree, bs
    status = Column(Boolean, nullable = True) # rka: 0, active: 1
    dob = Column(DateTime(timezone=True), nullable = True)
    address = Column(String, nullable = True)
    city = Column(String, nullable = True)
    state = Column(String, nullable = True)
    pincode = Column(String, nullable = True)
    country = Column(String, nullable = True)
    contact = Column(String, nullable = True)
    profile_pic = Column(String, nullable = True)

class Background(Base):
    __tablename__ = 'background'
    id = Column(Integer, primary_key = True, index = True)
    user_id = Column(Integer, ForeignKey(Users.id))
    college = Column(String, nullable = False)
    discipline = Column(String, nullable = False)
    completion_year = Column(Integer, nullable = False)
    address = Column(String, nullable = True)
    city = Column(String, nullable = True)
    state = Column(String, nullable = True)
    pincode = Column(String, nullable = True)
    country = Column(String, nullable = True)
    employment_status = Column(Boolean, nullable = False)

class Courses(Base):
    __tablename__ = 'courses'
    id = Column(Integer, primary_key = True, index = True)
    course_id = Column(String, nullable = False)
    name = Column(String, nullable = False)
    description = Column(String, nullable = False)
    duration = Column(Integer, nullable = False) # handle only 12 values constraint
    course_credit = Column(Integer, nullable =False) # handle only 3 values constraint
    is_project = Column(Boolean, nullable = False)
    status = Column(Boolean, nullable = False) # running status
    level = Column(Integer, nullable = False) # 0: foundation, 1: diploma, 2: lvl_3, 3: lvl_4, 4: lvl_5
    avg_rating = Column(Float, nullable = False)

class User_Courses(Base):
    __tablename__ = 'user_course'
    id = Column(Integer, primary_key = True, index = True)
    user_id = Column(Integer, ForeignKey(Users.id))
    course_id = Column(Integer, ForeignKey(Courses.id))
    course_name = Column(String, nullable = False)
    avg_assignment_marks = Column(Float, nullable = True)
    avg_quizzes_marks = Column(Float, nullable = True)
    end_sem_marks = Column(Integer, nullable = True)
    status = Column(Integer, nullable = True) # 0: enrolled, 1: passed
    bonus = Column(Integer, nullable = True)

class Feedback(Base):
    __tablename__ = 'feedback'
    id = Column(Integer, primary_key = True, index = True)
    user_id = Column(Integer, ForeignKey(Users.id))
    course_id = Column(Integer, ForeignKey(Courses.id))
    feedback = Column(String, nullable = False)
    rating = Column(Integer, nullable=False)
    date = Column(DateTime(timezone=True), nullable = True)

class Recommended_Path(Base):
    __tablename__ = 'recommended_path'
    id = Column(Integer, primary_key = True, index = True)
    user_id = Column(Integer, ForeignKey(Users.id))
    status = Column(String, nullable = False) # pending/approved/disapproved
    foundation_lvl = Column(String, nullable = True)
    diploma_lvl = Column(String, nullable = True)
    degree_lvl = Column(String, nullable = True)

try:
    engine = create_engine(f'postgresql://postgres:{DB_PASSWORD}@{HOST}:{PORT}/recommender_system')
    if not database_exists(engine.url):
        create_database(engine.url)
except Exception as e:
    pass

Base.metadata.create_all(engine)