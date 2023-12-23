import os
from fastapi_sqlalchemy import db
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, Request
from fastapi.responses import FileResponse, JSONResponse
from backend.app.auth.auth_bearer import JWTBearer
from backend.app.utils.admin import (add_course,
                                     add_student,
                                     students_graph_data)
from backend.app.utils.course import (update_course,
                                      course_graph_data)
from backend.app.utils.user import check_user_type
from backend.app.utils.students import (get_student_details,
                                        get_students)
from backend.app.models.models import Courses
from backend.app.schema.requests import (Course as EditCourseRequest,
                                         AddCourse as AddCourseRequest)

router = APIRouter()

@router.get("/api/admin/students",
            dependencies=[Depends(JWTBearer())],
            summary="Get details of all students",
            tags=['admin', 'advisor'],
            responses={
                200: {
                    "description": "Successful Response",
                    "content": {
                        "application/json": {
                            "example": [
                                {
                                    "name": "string",
                                    "roll": "string",
                                    "level": 0,
                                    "status": 0
                                }
                            ]
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
def getStudents(request: Request):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) in [0, 2, 3]:
        try:
            return get_students()
        except Exception as e:
            return JSONResponse(status_code=e.status_code, content={"message": e.detail})
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")

@router.get("/api/admin/students/{roll}",
            dependencies=[Depends(JWTBearer())],
            summary="Get details of a student",
            tags=['admin'],
            responses={
                200: {
                    "description": "Successful Response",
                    "content": {
                        "application/json": {
                            "example": {
                                "name": "string",
                                "roll": "string",
                                "level": 0,
                                "status": 0
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
def getStudentDetails(roll, request: Request):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) in [0, 2]:
        # try:
            return get_student_details(roll)
        # except Exception as e:
            # return JSONResponse(status_code=e.status_code, content={"message": e.detail})
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")

@router.get("/api/admin/add-students-template",
            dependencies=[Depends(JWTBearer())],
            summary="Get template file for students' Details",
            tags=['admin'],
            responses={
                200: {
                    "description": "Successful Response",
                    "content": {
                        "text/csv": {
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
            })
async def getStudentTemplate(request: Request):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) in [0, 2]:
        template_path = os.path.join("backend", "app", "assets", "templates", "students.csv")
        if not os.path.isfile(template_path):
            raise HTTPException(status_code=404, detail="Template not found")
        headers = {
            'Content-Disposition': 'attachment; filename="students_template.csv"'
        }
        return FileResponse(template_path, headers=headers, media_type="text/csv")
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")

@router.post("/api/admin/add-students",
             dependencies=[Depends(JWTBearer())],
             summary="Add new student(s)",
             tags=['admin'],
             responses={
                200: {
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
async def addStudents(request: Request, file: UploadFile = File(...)):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) in [0, 2]:
        header = file.file.readline().decode('utf-8')
        student_details = file.file.readline().decode('utf-8')
        while student_details.strip():
            try:
                add_student(student_details)
            except:
                pass
            student_details = file.file.readline().decode('utf-8')
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")

@router.get("/api/admin/students-graph-data",
             dependencies=[Depends(JWTBearer())],
             summary="Get students' data for graphs",
             tags=['admin'],
             responses={
                200: {
                    "description": "Successful Response",
                    "content": {
                        "application/json": {
                            "example": {
                                "n_rka": 0,
                                "n_active": 0,
                                "n_foundation": 0,
                                "n_diploma": 0,
                                "n_degree": 0,
                                "n_bs": 0
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
async def getStudentsData(request: Request):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) in [0, 2]:
        try:
            res = students_graph_data()
            return JSONResponse(status_code=200, content=res)
        except Exception as e:
            return JSONResponse(status_code=e.status_code, content={"message": e.detail})
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")

@router.get("/api/admin/add-courses-template",
            dependencies=[Depends(JWTBearer())],
            summary="Get template file for courses' Details",
            tags=['admin'],
            responses={
                200: {
                    "description": "Successful Response",
                    "content": {
                        "text/csv": {
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
            })
async def getCourseTemplate(request: Request):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) in [0, 2]:
        template_path = os.path.join("backend", "app", "assets", "templates", "courses.csv")
        if not os.path.isfile(template_path):
            raise HTTPException(status_code=404, detail="Template not found")
        headers = {
            'Content-Disposition': 'attachment; filename="courses_template.csv"'
        }
        return FileResponse(template_path, headers=headers, media_type="text/csv")
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")

@router.post("/api/admin/add-courses",
             dependencies=[Depends(JWTBearer())],
             summary="Add new course(s)",
             tags=['admin'],
             responses={
                200: {
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
async def addCourses(request: Request, file: UploadFile = File(...)):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) in [0, 2]:
        header = file.file.readline().decode('utf-8')
        course_details = file.file.readline().decode('utf-8')
        while course_details.strip():
            try:
                add_course(course_details)
            except:
                pass
            course_details = file.file.readline().decode('utf-8')
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")

@router.post("/api/admin/add-courses-form",
             dependencies=[Depends(JWTBearer())],
             summary="Add new course(s)",
             tags=['admin'],
             responses={
                200: {
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
async def addCoursesFromForm(request: Request, course_details: AddCourseRequest):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) in [0, 2]:
        try:
            course = Courses(course_id=course_details.course_id,
                             name=course_details.name,
                             description=course_details.description,
                             duration=course_details.duration,
                             course_credit=course_details.course_credit,
                             is_project=course_details.is_project,
                             status=course_details.status,
                             level=course_details.level,
                             avg_rating=0)
            db.session.add(course)
            db.session.commit()
            return JSONResponse(status_code=201, content="Successfully Added!")
        except:
            return JSONResponse(status_code=500, content="Internal Server Error")
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")

@router.put("/api/courses/{course_id}",
             dependencies=[Depends(JWTBearer())],
             summary="Update course details",
             tags=['admin'],
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
async def updateCourseDetails(course_id, data: EditCourseRequest, request: Request):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) in [0, 2]:
        try:
            update_course(course_id, data)
            return JSONResponse(status_code=202, content="Successfully Updated!")
        except Exception as e:
            return JSONResponse(status_code=e.status_code, content={"message": e.detail})
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")

@router.get("/api/admin/courses-graph-data",
             dependencies=[Depends(JWTBearer())],
             summary="Get courses' data for graphs",
             tags=['admin'],
             responses={
                200: {
                    "description": "Successful Response",
                    "content": {
                        "application/json": {
                            "example": {
                                "top_n_courses_based_on_students": [
                                    {
                                        "name": "string",
                                        "course_id": "string",
                                        "name": "string",
                                        "description": "string",
                                        "duration": 0,
                                        "course_credit": 0,
                                        "is_project": True,
                                        "status": True,
                                        "level": True,
                                        "avg_rating": 0.0
                                    }
                                ]
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
async def getCoursesData(request: Request):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) in [0, 2]:
        try:
            res = course_graph_data()
            return JSONResponse(status_code=200, content=res)
        except Exception as e:
            return JSONResponse(status_code=e.status_code, content={"message": e.detail})
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")