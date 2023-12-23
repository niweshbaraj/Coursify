from fastapi_sqlalchemy import db
from sqlalchemy import func
from backend.app.models.models import Courses, Users, Background, User_Courses
from datetime import datetime
from backend.app.utils.user import choose_avatar

def add_course(course_details):
    (course_id,
     name,
     description,
     duration,
     course_credit,
     is_project,
     status,
     level) = course_details.split(",")
    try:
        course = Courses(course_id=course_id,
                        name=name,
                        description=description,
                        duration=int(duration),
                        course_credit=int(course_credit),
                        is_project=bool(is_project),
                        status=bool(status),
                        level=int(level),
                        avg_rating=0)
        db.session.add(course)
        db.session.commit()
    except:
        pass

def add_student(student_details):
    (username,name,password,gender,
    primary_email,secondary_email,cgpa,level,status,
    dob,address,city,state,pincode,country,
    contact,college,discipline,completion_year,
    college_address,college_city,college_state,
    college_pincode,college_country,employment_status,
    enrolled_courses,completed_courses) = student_details.split(",")

    user = Users(username=username,
                 name=name,
                 password=password,
                 gender=int(gender),
                 user_type=1,
                 primary_email=primary_email,
                 secondary_email=secondary_email,
                 cgpa=float(cgpa),
                 level=int(level),
                 status=bool(status),
                 dob=datetime.strptime(dob, "%d-%m-%Y"),
                 address=address,
                 city=city,
                 state=state,
                 pincode=pincode,
                 country=country,
                 contact=contact,
                 profile_pic=choose_avatar(int(gender)))

    db.session.add(user)
    db.session.commit()

    user = db.session.query(Users).filter(Users.primary_email == primary_email).first()

    user_background = Background(user_id = user.id,
                                 college=college,
                                 discipline=discipline,
                                 completion_year=int(completion_year),
                                 address=college_address,
                                 city=college_city,
                                 state=college_state,
                                 pincode=college_pincode,
                                 country=college_country,
                                 employment_status=bool(employment_status))

    db.session.add(user_background)
    db.session.commit()

    for course_id in enrolled_courses[1:-1].split(","):
        course = db.session.query(Courses).filter(Courses.course_id == course_id).first()
        if course:
            user_course=User_Courses(user_id=user.id,
                                    course_id=course.id,
                                    course_name=course.name,
                                    status=0)
            db.session.add(user_course)
            db.session.commit()

    for course_id in completed_courses[1:-1].split(","):
        course = db.session.query(Courses).filter(Courses.course_id == course_id).first()
        if course:
            user_course=User_Courses(user_id=user.id,
                                    course_id=course.id,
                                    course_name=course.name,
                                    status=1)
            db.session.add(user_course)
            db.session.commit()        

def students_graph_data():

    n_rka = db.session.query(Users).filter(Users.status == False).count()
    n_active = db.session.query(Users).filter(Users.status == True).count()
    n_foundation = db.session.query(Users).filter(Users.level == 0).count()
    n_diploma = db.session.query(Users).filter(Users.level == 1).count()
    n_degree = db.session.query(Users).filter(Users.level == 2).count()
    n_bs = db.session.query(Users).filter(Users.level == 3).count()
    
    return {
        "n_rka": n_rka,
        "n_active": n_active,
        "n_foundation": n_foundation,
        "n_diploma": n_diploma,
        "n_degree": n_degree,
        "n_bs": n_bs
    }