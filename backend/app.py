from flask import Flask, request, redirect
from dotenv import load_dotenv
import os
from models import *
from querys import *
from s3 import generateAccessURL

load_dotenv('.env')
DB_URI: str = os.getenv('SQLALCHEMY_DATABASE_URI')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI

db.init_app(app)


@app.route('/')
def home():
    return 'Welcome'

@app.get('/')
def search_user_by_name():
    search = request.values.get(search)
    resultproxy = queryUserByString(search)
    users = [{column: value for column, value in rowproxy.items()} for rowproxy in resultproxy]
    return users


@app.get('/find-musician')
def find_musician():
    regions = request.form.get('region')
    styles = request.form.get('style')
    instruments = request.form.get('instruments')
    resultproxy = queryCompatibleMusician(instruments, regions, styles)
    compatible_users = [{column: value for column, value in rowproxy.items()} for rowproxy in resultproxy]
    return compatible_users

@app.get('/user-sign-up')
def getAccessUrl():
    url = generateAccessURL('put_object')

@app.post('/user-sign-up')
def add_user():
    name = request.form.get('name')
    prefered_time = request.form.get('prefered_time')
    bio = request.form.get('bio')
    ig = request.form.get('ig')
    fb = request.form.get('fb')
    photo = request.form.get('photo')

    #need rest of the attributes
    new_user = User(name=name,
                    prefered_time=prefered_time,
                    bio=bio,
                    ig=ig,
                    fb=fb,
                    photo=photo)
    
    db.session.add(new_user)
    db.session.commit()

@app.get('/band-sign-up')
def getAccessUrl():
    url = generateAccessURL('put_object')

@app.post('/band-sign-up')
def add_band():
    name = request.form.get('name')
    bio = request.form.get('bio')
    practice_time = request.form.get('practice_time')
    ig = request.form.get('ig')
    fb = request.form.get('fb')

    #need rest of the attributes
    new_band = Band(name=name,
                    bio=bio)
    db.session.add(new_band)
    db.session.commit()



if(__name__ == '__main__'):
    app.run()