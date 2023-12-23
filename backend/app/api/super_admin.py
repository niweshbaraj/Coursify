from fastapi import APIRouter, Depends, Request
from backend.app.auth.auth_bearer import JWTBearer
from fastapi.responses import JSONResponse
from backend.app.utils.super_admin import (create_user,
                                           change_role)
from backend.app.utils.user import check_user_type
from backend.app.schema.requests import Register as RegisterRequest

router = APIRouter()

@router.post("/api/super-admin/register",
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
             summary="Registers a new super-admin",
             tags=['super-admin'])
async def register(data: RegisterRequest):
    try:
        create_user(data)
        return JSONResponse(status_code=201, content="Successfully Registered!")
    except Exception as e:
        return JSONResponse(status_code=e.status_code, content={"message": e.detail})
   
@router.put("/api/super-admin/change_role/{user_id}",
            dependencies=[Depends(JWTBearer())],
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
            },
            summary="Change role of a user",
            tags=['super-admin'])
async def changeRole(user_id, user_type, request: Request):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) == 0:
        try:
            type(user_id)
            change_role(user_id, user_type)
            return JSONResponse(status_code=202, content="Successfully Changed!")
        except Exception as e:
            return JSONResponse(status_code=e.status_code, content={"message": e.detail})
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")