from fastapi_sqlalchemy import db
from backend.app.models.models import Recommended_Path, Users

def get_pending_recommendation_paths():
    paths = db.session.query(Recommended_Path).filter(Recommended_Path.status == "pending").all()
    p = []
    for path in paths:
        p_ = {}
        p_['path_id'] = path.id
        p_['path'] = {}
        p_['path']['foundation'] = path.foundation_lvl
        p_['path']['diploma'] = path.diploma_lvl
        p_['path']['degree'] = path.degree_lvl

        student = db.session.query(Users).filter(Users.id == path.user_id).first()

        p_['student_details'] = {
            "name": student.name,
            "email": student.primary_email,
            "level": student.level,
            "cgpa": student.cgpa
        }

        p.append(p_)

    return p