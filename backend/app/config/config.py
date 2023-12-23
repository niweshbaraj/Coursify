from app.config.dev import DevConfig
from app.config.production import ProductionConfig

class Config:
    def __init__(self):
        self.dev_config = DevConfig()
        self.production_config = ProductionConfig()