import os, datetime, jwt, aiofiles

SECRET_KEY = os.getenv('SECRET_KEY', 'devsecretkey')
ADMIN_USER = os.getenv('ADMIN_USER', 'admin')
ADMIN_PASS = os.getenv('ADMIN_PASS', 'changeme')


def create_token(username: str):
    payload = {'sub': username, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=12)}
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def verify_token(token: str):
    try:
        data = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return data.get('sub')
    except:
        return None