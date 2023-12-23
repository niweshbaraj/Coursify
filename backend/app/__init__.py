from fastapi import FastAPI
from fastapi_sqlalchemy import DBSessionMiddleware
from fastapi.openapi.utils import get_openapi

from backend.app.api import (user,
                             admin,
                             advisor,
                             alumni,
                             student,
                             super_admin)

from dotenv import load_dotenv, find_dotenv
import os

_ = load_dotenv(find_dotenv())
DB_PASSWORD = os.getenv('DB_PASSWORD')
HOST = os.getenv('HOST')
PORT = os.getenv('PORT')


description = """
The Recommender System API enables creation of application that can
provide students with learning path recommendations which can help
them to stay on track and make progress towards their educational goals.
"""

app = FastAPI(title="Recommender System",
              description=description,
              version="0.0.1")

def custom_openapi():
    if not app.openapi_schema:
        app.openapi_schema = get_openapi(
            title=app.title,
            version=app.version,
            openapi_version=app.openapi_version,
            description=app.description,
            terms_of_service=app.terms_of_service,
            contact=app.contact,
            license_info=app.license_info,
            routes=app.routes,
            tags=app.openapi_tags,
            servers=app.servers,
        )
        for _, method_item in app.openapi_schema.get('paths').items():
            for _, param in method_item.items():
                responses = param.get('responses')

                if '422' in responses:
                    del responses['422']
                if '200' in responses and ('201' in responses or \
                                           '202' in responses or \
                                           '203' in responses or \
                                           '204' in responses or \
                                           '205' in responses):
                    del responses['200']

    return app.openapi_schema

app.openapi = custom_openapi

app.add_middleware(DBSessionMiddleware,
                   db_url=f'postgresql://postgres:{DB_PASSWORD}@{HOST}:{PORT}/recommender_system')

app.include_router(user.router)
app.include_router(admin.router)
app.include_router(advisor.router)
app.include_router(alumni.router)
app.include_router(student.router)
app.include_router(super_admin.router)