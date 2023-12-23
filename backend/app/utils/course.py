from fastapi_sqlalchemy import db
from backend.app.models.models import Courses, User_Courses
from fastapi import HTTPException
from sqlalchemy.sql import text, func

def get_courses():

    c = []
    courses = db.session.query(Courses).all()

    for course in courses:
        d = {
            "id": course.id,
            "name": course.name,
            "course_id": course.course_id,
            "description": course.description,
            "duration": course.duration,
            "course_credit": course.course_credit,
            "is_project": course.is_project,
            "status": course.status,
            "level": course.level,
            "avg_rating": course.avg_rating,
        }
        
        c.append(d)
    return c

def get_course(course_id):

    course = db.session.query(Courses).filter(Courses.id == course_id).first()
    if course:
        c = {
            "name": course.name,
            "course_id": course.course_id,
            "name": course.name,
            "description": course.description,
            "duration": course.duration,
            "course_credit": course.course_credit,
            "is_project": course.is_project,
            "status": course.status,
            "level": course.level,
            "avg_rating": course.avg_rating
        }
        return c
    else:
        raise HTTPException(status_code=404, detail="Course not found.")

def update_course(course_id, data):

    course = db.session.query(Courses).filter(Courses.id == course_id).first()
    if course:
        course.name = data.name
        course.description = data.description
        course.duration = data.duration
        course.course_credit = data.course_credit
        course.is_project = data.is_project
        course.status = data.status
        course.level = data.level
        db.session.commit()
    else:
        raise HTTPException(status_code=400, detail="Not a valid course id.")

def course_graph_data(n=3):

    courses = db.session.query(Courses,
                               Courses.name,
                               Courses.course_id,
                               Courses.description,
                               Courses.duration,
                               Courses.course_credit,
                               Courses.is_project,
                               Courses.status,
                               Courses.level,
                               Courses.avg_rating,
                               func.count(User_Courses.user_id)\
                            .label('total')).join(User_Courses)\
                            .group_by(Courses).order_by(text('total DESC')).all()
    top_n_courses = []
    for course in courses:
        top_n_courses.append({
            "name": course.name,
            "course_id": course.course_id,
            "description": course.description,
            "duration": course.duration,
            "course_credit": course.course_credit,
            "is_project": course.is_project,
            "status": course.status,
            "level": course.level,
            "avg_rating": course.avg_rating
        })

    return {
        "top_n_courses_based_on_students": top_n_courses
    }



