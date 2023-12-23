from fastapi import APIRouter, Depends, Form, File, UploadFile
from fastapi.responses import JSONResponse
from backend.app.auth.auth_bearer import JWTBearer
from backend.app.utils.user import (change_password,
                                    check_user,
                                    create_user,
                                    get_user,
                                    login_user,
                                    logout_user,
                                    update_user)

from backend.app.utils.course import (get_course,
                                      get_courses)

from backend.app.schema.requests import (Register as RegisterRequest,
                                         Login as LoginRequest,
                                         ForgetPassword as ForgetPasswordRequest,
                                         User as UpdateUserDetailsRequest)

router = APIRouter()

@router.post("/api/register",
             responses={
                 201: {
                     "description": "Successful Response",
                     "content": {
                         "application/json": {
                             "example": "string"
                         }
                     }
                 },
                 409: {
                     "description": "Conflict Error",
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
             summary="Registers a new user",
             tags=['user'])
async def register(data: RegisterRequest):
    try:
        create_user(data)
        return JSONResponse(status_code=201, content="Successfully Registered!")
    except Exception as e:
        return JSONResponse(status_code=e.status_code, content={"message": e.detail})

@router.post("/api/login",
             summary="Login",
             tags=['user'],
             responses={
                 200: {
                     "description": "Successful Response",
                     "content": {
                         "application/json": {
                             "example": {"id": 0,
                                         "token": "string"}
                         }
                     }
                 },
                 401: {
                     "description": "Authorization Error",
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
             })
async def login(data: LoginRequest):
    # try:
        res = login_user(data)
        return JSONResponse(status_code=200, content=res)
    # except Exception as e:
        # return JSONResponse(status_code=e.status_code, content={"message": e.detail})

@router.get("/api/forget-password",
            summary="Check if account exists for forget password",
            tags=['user'],
            responses={
                 200: {
                     "description": "Successful Response",
                     "content": {
                         "application/json": {
                             "example": True
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
            })
async def checkAccount(email):
    try:
        accountExists = check_user(email)
        return JSONResponse(status_code=200, content=accountExists)
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": "Something went wrong"})

@router.put("/api/forget-password",
            summary="Change password",
            tags=['user'],
            responses={
                 202: {
                     "description": "Successful Response",
                     "content": {
                         "application/json": {
                             "example": "string"
                         }
                     }
                 },
                 400: {
                     "description": "Bad Request",
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
             })
async def changePassword(data: ForgetPasswordRequest):
    
    try:
        change_password(data)
        return JSONResponse(status_code=202, content="Successfully Changed!")
    except Exception as e:
        return JSONResponse(status_code=e.status_code, content={"message": e.detail})

@router.get("/api/profile/{user_id}",
            dependencies=[Depends(JWTBearer())],
            summary="Get user details",
            tags=['user'],
            responses={
                 200: {
                     "description": "Successful Response",
                     "content": {
                         "application/json": {
                             "example": {
                                 "username": "string",
                                 "name": "string",
                                 "gender": 0,
                                 "user_type": 0,
                                 "primary_email": "string",
                                 "secondary_email": "string",
                                 "dob": "2020-04-13T00:00:00",
                                 "address": "string",
                                 "city": "string",
                                 "state": "string",
                                 "pincode": "string",
                                 "country": "string",
                                 "contact": "string",
                                 "profile_pic": "string",
                                 "college": "string",
                                 "discipline": "string",
                                 "completion_year": "2020-04-13T00:00:00",
                                 "college_address": "string",
                                 "college_city": "string",
                                 "college_state": "string",
                                 "college_pincode": "string",
                                 "country": "string",
                                 "employment_status": "boolean",
                                 "enrolled_courses": "list",
                                 "completed_courses": "list"
                             }
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
                 500: {
                     "description": "Internal Server Error",
                     "content": {
                         "application/json": {
                             "example": {"message": "string"}
                         }
                     }
                 }
             })
async def getUser(user_id):
    try:
        res = get_user(user_id)
        return JSONResponse(status_code=200, content=res)
    except Exception as e:
        return JSONResponse(status_code=e.status_code, content={"message": e.detail})

@router.put("/api/profile/{user_id}",
            dependencies=[Depends(JWTBearer())],
            summary="Update user details",
            tags=['user'],
            responses={
                 202: {
                     "description": "Successful Response",
                     "content": {
                         "application/json": {
                             "example": "string"
                         }
                     }
                 },
                 400: {
                     "description": "Bad Request",
                     "content": {
                         "application/json": {
                             "example": {"message": "string"}
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
                 500: {
                     "description": "Internal Server Error",
                     "content": {
                         "application/json": {
                             "example": {"message": "string"}
                         }
                     }
                 }
             })
async def updateUserDetails(user_id, data: UpdateUserDetailsRequest):
    try:
        # update_user(user_id, data, profile_pic)
        pass
    except Exception as e:
        return JSONResponse(status_code=e.status_code, content={"message": e.detail})

@router.post("/api/logout",
             dependencies=[Depends(JWTBearer())],
             summary="Logout",
             tags=['user'],
             responses={
                 200: {
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
                 500: {
                     "description": "Internal Server Error",
                     "content": {
                         "application/json": {
                             "example": {"message": "string"}
                         }
                     }
                 }
             })
async def logout():
    try:
        logout_user()
        return JSONResponse(status_code=200, content="Successfully logged out!")
    except Exception as e:
        return JSONResponse(status_code=e.status_code, content={"message": e.detail})

@router.get("/api/courses",
            summary="Get all courses",
            tags=['user'],
            responses={
                200: {
                    "description": "Successful Response",
                    "content": {
                        "application/json": {
                            "example": [
                                {
                                    "name": "string",
                                    "course_id": "string",
                                    "name": "string",
                                    "description": "string",
                                    "duration": 0,
                                    "course_credit": 0,
                                    "is_project": True,
                                    "status": True,
                                    "level": 0,
                                    "avg_rating": 0.0
                                }
                            ]
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
            })
async def getCourses():
    courses = get_courses()
    return JSONResponse(status_code=200, content=courses)

@router.get("/api/courses/{course_id}",
            summary="Get course details",
            tags=['user'],
            responses={
                200: {
                    "description": "Successful Response",
                    "content": {
                        "application/json": {
                            "example": {
                                "name": "string",
                                "course_id": "string",
                                "name": "string",
                                "description": "string",
                                "duration": 0,
                                "course_credit": 0,
                                "is_project": True,
                                "status": True,
                                "level": 0,
                                "avg_rating": 0.0
                            }
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
            })
async def getCourseDetails(course_id):
    course = get_course(course_id)
    return JSONResponse(status_code=200, content=course)