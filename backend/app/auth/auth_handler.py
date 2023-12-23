import time
from typing import Dict
import jwt

JWT_SECRET = "Just trying"
JWT_ALGORITHM = "HS256"

def encodeJWT(email: str) -> Dict[str, str]:
    payload = {
        "email": email,
        "expires": time.time() + 60000
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token

def decodeJWT(token: str) -> dict:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return decoded_token if decoded_token["expires"] >= time.time() else None
    except:
        return {}