from fastapi import APIRouter, Depends, Request
from backend.app.auth.auth_bearer import JWTBearer
from fastapi.responses import JSONResponse
from backend.app.utils.user import check_user_type
from backend.app.utils.advisor import get_pending_recommendation_paths

router = APIRouter()

@router.get("/api/advisor/recommendation-paths",
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
            summary="Get all recommendation paths for approval",
            tags=['advisor'])
async def getPendingRecommendationPaths(request: Request):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) == 3:
        return JSONResponse(status_code=200, content=get_pending_recommendation_paths())
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")
    

@router.post("/api/advisor/recommendation-path/{path_id}",
            dependencies=[Depends(JWTBearer())],
            responses={
                204: {
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
            },
            summary="Approve recommendation path",
            tags=['advisor'])
async def approvePendingRecommendationPath(path_id, request: Request):
    token = request.headers["authorization"].split()[1]
    if check_user_type(token) == 3:
        return
    else:
        return JSONResponse(status_code=403, content="You do not have the required permissions.")