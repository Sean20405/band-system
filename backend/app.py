from flask import Flask, request, redirect, jsonify, make_response, send_file
from flask_cors import CORS
from dotenv import load_dotenv
from werkzeug.utils import secure_filename
import urllib.request
import os
from database.schema.models import *
from database.db_operatoin import *

# Initailization
load_dotenv('.env')
DB_URI: str = os.getenv('SQLALCHEMY_DATABASE_URI')
UPLOAD_FOLDER: str = os.getenv('UPLOAD_FOLDER')
ALLOWED_EXTENTIONS = set(['png', 'jpg', 'jpeg'])

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DB_URI
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app, resources={r"/api/*": {"origins": "*", "methods": ["GET", "POST"]}})

db.init_app(app)

def allow_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENTIONS

@app.route('/', methods = ['GET'])
def find_musician():
    regions = request.form.getlist('region')
    styles = request.form.getlist('style')
    instruments = request.form.getlist('instrument')
    resp = jsonify(queryCompatibleMusician(instruments, regions, styles))
    resp.headers.add('Access-Control-Allow-Origin', '*')
    resp.status_code = 200
    return resp

@app.route('/image/<file_name>', methods = ['GET'])
def show_image(file_name):
    image_path = "static/uploads/" + file_name
    if file_name.endswith(".png"):
        return send_file(image_path, mimetype='image/png')
    elif file_name.endswith(".jpg"):
        return send_file(image_path, mimetype='image/jpg')
    elif file_name.endswith(".jpeg"):
        return send_file(image_path, mimetype='image/jpeg')

## API for User

@app.route('/upload', methods = ['POST'])
def upload_photo():
    if ('photo' not in request.files):
        resp = jsonify({
            "message": "No photo input in the request",
            "status": "Failed"
        })
        resp.status_code = 400
        return resp
    files_upload = request.files.get('photo')

    success = False

    for file in files_upload:
        if file and allow_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            success = True
        else:
            resp = jsonify({
                "message": "File type is not allowed",
                "status": "Failed"
            })
            return resp
        
    if success:
        resp = jsonify({
            "message": "File successfully uploaded",
            "status": "Success"
        })
        resp.status_code = 201
        return resp



@app.route('/user-sign-up', methods = ['POST'])
def add_user():
    id = request.form.get("id")
    password = request.form.get("password")
    name = request.form.get('name')
    exist = userExist(id)
    if exist:
        return "id is already used"
    new_user = User(id=id, password=password, name=name)
    db.session.add(new_user)
    db.session.commit()
    resp =  jsonify(
        {
        "id": id,
        "password": password,
        "name": name
        },
    )
    resp.headers.add('Access-Control-Allow-Origin', '*')
    resp.status_code = 200
    return resp

@app.route('/sign-in', methods = ['GET'])
def sign_in():
    role = request.form.get("role")
    id = request.form.get("id")
    # password = request.form.get("password")
    # not done, need query
    if role == 'band':
        band = get_band_by_id(id)
        return band.password
        
    elif role == 'user':
        user = get_user_by_id(id)
        resp = jsonify({
            "password": user.password
        })
        resp.headers.add('Access-Control-Allow-Origin', '*')
        resp.status_code = 200
        return resp


@app.route('/user', methods = ["GET"])
def get_user():
    if ('user_id' not in request.args):
        resp = jsonify({
            "message": "No 'user_id' input in the request",
            "status": "Failed"
        })
        resp.status_code = 400
        return resp
    user_id = request.args.get('user_id')
    user = get_user_by_id(user_id)
    resp = jsonify(
        {
            "id": user.id,
            "name": user.name,
            "prefered_time": user.prefered_time,
            "bio": user.bio,
            "email": user.email,
            "ig": user.ig,
            "fb": user.fb,
            "photo": user.photo
        }
    )
    resp.headers.add('Access-Control-Allow-Origin', '*')
    resp.status_code = 201
    return resp


@app.route('/user-edit', methods = ['GET', 'PUT'])
def user_info():
    if (request.method == 'GET'):
        user_id = request.args.get('user_id')
        user = get_user_by_id(user_id)
        return jsonify(user)
    elif (request.method == 'PUT'):
        # User ID
        if ('user_id' not in request.args):
            resp = jsonify({
                "message": "No user_id input in the request",
                "status": "Failed"
            })
            resp.status_code = 400
            return resp
        user_id = request.args.get('user_id')
        instruments = request.form.getlist('instrument')
        regions = request.form.getlist('region')
        styles = request.form.getlist('style')
        prefered_time = request.form.get('prefered_time')
        bio = request.form.get('bio')
        email = request.form.get('email')
        ig = request.form.get('ig')
        fb = request.form.get('fb')

        # Upload Photo
        if ('photo' not in request.files):
            resp = jsonify({
                "message": "No photo input in the request",
                "status": "Failed"
            })
            resp.status_code = 400
            return resp
        photo = request.files.get('photo') 

        filename = ""
        if photo and allow_file(photo.filename):
            filename = secure_filename(photo.filename)
            photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        else:
            resp = jsonify({
                "message": "File type is not allowed",
                "status": "Failed"
            })
            return resp
        
        # Update user's input to database
        updateUserInstruments(user_id, instruments)
        updateUserRegions(user_id, regions)
        updateUserStyles(user_id, styles)
        updateUser(user_id, bio, prefered_time, email, ig, fb, filename)
        db.session.commit()

        # Create message
        resp = jsonify({
            "message": "Successfully update all user's infromation",
            "status": "Success"
        })
        resp.headers.add('Access-Control-Allow-Origin', '*')
        resp.status_code = 201
        return resp


# API for Band

# Sign-up a band account for your band
@app.route('/band-sign-up', methods = ['POST'])
def add_band():
    id = request.form.get("id")
    password = request.form.get("password")
    name = request.form.get('name')
    exist = bandExist(id)
    if exist:
        return "id is already used"
    new_band = Band(id=id, password=password ,name=name)
    db.session.add(new_band)
    db.session.commit()
    return make_response(
        {
        "id": id,
        "name": name
        },
        200
    )


@app.route('/band')
def get_band():
    band_id = request.args.get('band_id')
    band = get_band_by_id(band_id)
    return jsonify(band)

@app.route('/band-edit', methods = ['GET', 'PUT'])
def band_info():
    if (request.method == 'GET'):
        band_id = request.args.get('band_id')
        band = get_band_by_id(band_id)
        return jsonify(band)
    elif (request.method == 'PUT'):
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


if(__name__ == '__main__'):
    app.run(debug= True)
