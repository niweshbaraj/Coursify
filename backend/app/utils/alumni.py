from fastapi_sqlalchemy import db
from backend.app.models.models import Users, Feedback, Courses
from fastapi import HTTPException
from datetime import date


def add_feedback_and_rating(email, course_id, data):

    user = db.session.query(Users).filter(Users.primary_email == email).first()
    if user:
        course = db.session.query(Courses).filter(Courses.course_id == course_id).first()
        if course:
            try:
                feedback = Feedback(user_id=user.id,
                                    course_id=course.id,
                                    feedback=data.feedback,
                                    date=date.today(),
                                    rating=data.rating)
                db.session.add(feedback)
                db.session.commit()

                ratings = db.session.query(Feedback.rating).filter(Feedback.course_id == course.id).all()
                if ratings:
                    r = 0
                    for rating in ratings:
                        r+=rating[0]
                    course.avg_rating = r/len(ratings)
                db.session.commit()
            except:
                raise HTTPException(status_code=500, detail="Something went wrong!")
        else:
            raise HTTPException(status_code=404, detail="Course not found")
    else:
        raise HTTPException(status_code=403, detail="Unauthorized user!")
