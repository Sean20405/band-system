from flask import Flask, request, redirect, jsonify, make_response
from dotenv import load_dotenv
import os
from models import *
from querys import *
# from s3 import generateAccessURL

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
    users = jsonify(queryUserByString(search))
    
    return users


@app.get('/find-musician')
def find_musician():
    regions = request.form.get('region')
    styles = request.form.get('style')
    instruments = request.form.get('instruments')
    compatible_users = jsonify(queryCompatibleMusician(instruments, regions, styles))
    
    return compatible_users

# @app.get('/user-sign-up')
# def getAccessUrl():
#     url = generateAccessURL('put_object')

@app.post('/user-sign-up')
def add_user():
    id = request.form.get("id")
    name = request.form.get('name')
    exist = userExist(id)
    if exist:
        return "id is already used"
    new_user = User(id=id, name=name)
    db.session.add(new_user)
    db.session.commit()
    return make_response(
        {
        "id": id,
        "name": name
        },
        200
    )
 
    
    

@app.put('/user')
def edit_user_info():
    #/user?user_id=<user_id>
    
    user_id = request.args.get('user_id')
    instruments = request.form.getlist('instrument')
    regions = request.form.getlist('region')
    styles = request.form.getlist('style')
    prefered_time = request.form.get('prefered_time')
    bio = request.form.get('bio')
    ig = request.form.get('ig')
    fb = request.form.get('fb')
    photo = request.form.get('photo')

    # return{
    #     "1": user_id,
    #     "2": instruments,
    #     "3":regions,
    #     "4":styles,
    #     "5":prefered_time,
    #     "6":bio,
    #     "7":ig,
    #     "8":fb,
    #     "9":photo
    # }
 

    updateInstruments(user_id, instruments)
    updateRegions(user_id, regions)
    updateStyles(user_id, styles)
    updateUser(user_id, bio, prefered_time, ig, fb, photo)

    db.session.commit()

    
    
    return make_response("Success", 200)


# @app.get('/band-sign-up')
# def getAccessUrl():
#     url = generateAccessURL('put_object')

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