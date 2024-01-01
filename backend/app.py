from flask import Flask, request, redirect, jsonify, make_response
from dotenv import load_dotenv
import os
from backend.database.schema.models import *
from backend.database.db_operatoin import *
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
    #     "user_id": user_id,
    #     "instruments": instruments,
    #     "regions": regions,
    #     "styles": styles,
    #     "bio": bio
    # }

    updateUserInstruments(user_id, instruments)
    updateUserRegions(user_id, regions)
    updateUserStyles(user_id, styles)
    updateUser(user_id, bio, prefered_time, ig, fb, photo)

    db.session.commit()
    
    return make_response("Success", 200)



@app.post('/band-sign-up')
def add_band():
    id = request.form.get("id")
    name = request.form.get('name')
    exist = bandExist(id)
    if exist:
        return "id is already used"
    new_band = Band(id=id, name=name)
    db.session.add(new_band)
    db.session.commit()
    return make_response(
        {
        "id": id,
        "name": name
        },
        200
    )


@app.put('/band')
def edit_band_info():
    #/band?band_id=<band_id>
    
    band_id = request.args.get('band_id')
    styles = request.form.getlist('style')
    practice_time = request.form.get('practice_time')
    bio = request.form.get('bio')
    ig = request.form.get('ig')
    fb = request.form.get('fb')
    photo = request.form.get('photo') 

    updateBandStyles(band_id, styles)
    updateBand(band_id, bio, practice_time, ig, fb, photo)

    db.session.commit()
    
    return make_response("Success", 200)


def updateBand(band_id, bio, prefered_time, ig, fb, photo):
    stmt = db.update(
        Band
    ).where(
        Band.id == band_id
    ).values(
        bio = bio,
        prefered_time = prefered_time,
        ig = ig,
        fb = fb,
        photo = photo
    )
    
    db.session.execute(stmt)
    db.session.commit()
    return


if(__name__ == '__main__'):
    app.run()