from fastapi import APIRouter, Depends, Request
from backend.app.auth.auth_bearer import JWTBearer
from fastapi.responses import JSONResponse
from backend.app.auth.auth_handler import decodeJWT
from backend.app.schema.requests import Feedback as FeedbackRequest
from backend.app.utils.alumni import add_feedback_and_rating
from backend.app.utils.user import check_user_type

router = APIRouter()

@router.post("/api/feedback/{course_id}",
            dependencies=[Depends(JWTBearer())],
            responses={
                201: {
                    "description": "Successful Response",
                    "content": {
                        "application/json": {
                            "example": "string"
                        }
                    }
                },
                403: {
                    "description": "Forbidden",
                    "content": {
                        "application/json": {
                            "example": {"message": "string"}
                        }
                    }
                },
                404: {
                    "description": "Not Found",
                    "content": {
                        "application/json": {
                            "example": {"message": "string"}
                        }
                    }
                },
                500: {
                    "description": "Internal Server Error",
                    "content": {
                        "application/json": {
                            "example": {"message": "string"}
                        }
                    }
                }
            },
            summary="Provide feedback",
            tags=['student', 'alumni'])
def feedback(course_id, feedback: FeedbackRequest, request: Request):
    token = request.headers["authorization"].split()[1]
    email = decodeJWT(token)['email']
    if check_user_type(token) in [1, 4]:
        # try:
            add_feedback_and_rating(email, course_id, feedback)
            return JSONResponse(status_code=201, content="Feedback given successfully!")
        # except Exception as e:
        #     return JSONResponse(status_code=e.status_code, content={"message": e.detail})
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")