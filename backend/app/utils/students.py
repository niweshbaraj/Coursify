import json, os, random
from fastapi_sqlalchemy import db
from backend.app.auth.auth_handler import decodeJWT
from fastapi import HTTPException
from backend.app.models.models import Users, Recommended_Path
from backend.app.utils.user import get_enrolled_and_completed_courses, get_profilepic

def get_students():

    s = []
    students = db.session.query(Users).filter(Users.user_type == 1).all()

    for student in students:
        
        d = {
                "id": student.id,
                "name": student.name,
                "roll no": student.primary_email.split("@")[0],
                "level": student.level,
                "status": student.status,
                "cgpa": student.cgpa
            }
        s.append(d)

    return s

def get_student_details(id):

    # email = roll + "@ds.study.iitm.ac.in"
    student = db.session.query(Users).filter(Users.id == id).first()
    if student:
        enrolled_courses, completed_courses=get_enrolled_and_completed_courses(student.id)
        address = student.address if student.address!=None  else "" + ", " + student.city if student.city!=None else "" + ", " + student.state if student.state!=None else "" + ", " + str(student.pincode) if student.pincode!=None else "" + ", " + student.country if student.country!=None else ""
        s = {
                "id": student.id,
                "name": student.name,
                "email": student.primary_email,
                "level": student.level,
                "status": student.status,
                "address" : address,
                "contact": student.contact,
                'profile_pic': get_profilepic(student.profile_pic),
                "enrolled_courses": enrolled_courses,
                "completed_courses": completed_courses
            }
        
        return s
    else:
        raise HTTPException(status_code=404, detail="User not found.")

def get_recommendation_path(data, token):
    email = decodeJWT(token)['email']
    user = db.session.query(Users).filter(Users.primary_email == email).first()
    dir_path = os.path.join("backend",
                        "app",
                        "assets",
                        "recommendation_paths")
    paths = json.load(open(os.path.join(dir_path, "paths.json")))
    n_paths = random.randint(2,3)
    recommended_paths = []
    for path in range(n_paths):
        recommended_path = random.choice(paths)
        if recommended_path not in recommended_paths:
            new_recommended_path = Recommended_Path(user_id=user.id,
                                                    status="pending",
                                                    foundation_lvl=str(recommended_path['path']['foundation']) if "foundation" in recommended_path['path'].keys() else None,
                                                    diploma_lvl=str(recommended_path['path']['diploma']) if "diploma" in recommended_path['path'].keys() else None,
                                                    degree_lvl=str(recommended_path['path']['degree']) if "degree" in recommended_path['path'].keys() else None)
            db.session.add(new_recommended_path)
            db.session.commit()
            recent_recommendation_path = db.session.query(Recommended_Path).all()[-1]
            recommended_path["path_id"] = recent_recommendation_path.id
            recommended_paths.append(recommended_path)
    return recommended_paths

def get_recommendation_path_status(token):
    email = decodeJWT(token)['email']
    user = db.session.query(Users).filter(Users.primary_email == email).first()

    recommendation_paths = db.session.query(Recommended_Path).filter(Recommended_Path.user_id==user.id).all()
    paths_with_status = []

    for recommendation_path in recommendation_paths:
        recommendation_path_with_status = {}
        recommendation_path_with_status['path_id'] = recommendation_path.id
        recommendation_path_with_status['foundation'] = recommendation_path.foundation_lvl
        recommendation_path_with_status['diploma'] = recommendation_path.diploma_lvl
        recommendation_path_with_status['degree'] = recommendation_path.degree_lvl
        recommendation_path_with_status['status'] = recommendation_path.status

        paths_with_status.append(recommendation_path_with_status)

    return paths_with_status