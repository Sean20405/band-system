from flask import Flask, request
from models import db


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:kl921022@localhost:5432/devdbfp'

db.init_app(app)


@app.route('/')
def home():
    return 'Welcome'

if(__name__ == '__main__'):
    app.run()