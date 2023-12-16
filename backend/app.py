from flask import Flask, request, redirect
from models import *
from querys import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:kl921022@localhost:5432/devdbfp'

db.init_app(app)


@app.route('/')
def home():
    return 'Welcome'

@app.get('/')
def search_user_by_name():
    search = request.values.get(search)
    resultproxy = queryUserByString(search)
    users = [{column: value for column, value in rowproxy.items()} for rowproxy in resultproxy]
    # render - list query result


@app.get('/find-musician')
def find_musician():
    regions = request.form.get('region')
    styles = request.form.get('style')
    instruments = request.form.get('instruments')
    resultproxy = queryCompatibleMusician(instruments, regions, styles)
    compatible_users = [{column: value for column, value in rowproxy.items()} for rowproxy in resultproxy]
    #render - list query result


@app.post('/new-user')
def add_user():
    name = request.form.get('name')
    prefered_time = request.form.get('prefered_time')
    bio = request.form.get('bio')
    #photo upload to S3 then save url in database

    #need rest of the attributes
    new_user = User(name=name,
                    prefered_time=prefered_time,
                    bio=bio)
    
    db.session.add(new_user)
    db.session.commit()


@app.post('/new-band')
def add_band():
    name = request.form.get('name')
    bio = request.form.get('bio')

    #need rest of the attributes
    new_band = Band(name=name,
                    bio=bio)
    db.session.add(new_band)
    db.session.commit()



if(__name__ == '__main__'):
    app.run()