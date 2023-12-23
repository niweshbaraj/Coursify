from fastapi import APIRouter, Depends, Request
from fastapi.responses import JSONResponse
from backend.app.auth.auth_bearer import JWTBearer
from backend.app.utils.user import check_user_type
from backend.app.utils.students import (get_recommendation_path,
                                        get_recommendation_path_status)
from backend.app.schema.requests import RecommendPaths as RecommendPathsRequest

router = APIRouter()

@router.post("/api/recommendation-path",
            dependencies=[Depends(JWTBearer())],
            responses={
                200: {
                    "description": "Successful Response",
                    "content": {
                        "application/json": {
                            "example": [
                                {
                                    "path_id": 0,
                                    "path": [
                                        ["string", "string"],
                                        ["string", "string", "string"]
                                    ]
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
            },
            summary="Get recommendation paths",
            tags=['student'])
async def getSuggestedPaths(data: RecommendPathsRequest, request: Request):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) == 1:
        paths = get_recommendation_path(data, token)
        return JSONResponse(status_code=200, content=paths)
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")

@router.get("/api/recommendation-paths/status",
            dependencies=[Depends(JWTBearer())],
            responses={
                200: {
                    "description": "Successful Response",
                    "content": {
                        "application/json": {
                            "example": [
                                {
                                    "path_id": 0,
                                    "path": [
                                        ["string", "string"],
                                        ["string", "string", "string"]
                                    ],
                                    "status": "string"
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
            },
            summary="Check status of recommendation paths",
            tags=['student'])
async def pathStatus(request: Request):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) == 1:
        paths_with_status = get_recommendation_path_status(token)
        return JSONResponse(status_code=200, content=paths_with_status)
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")
    