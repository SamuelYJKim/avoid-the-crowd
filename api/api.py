import requests
import json
from flask import Flask
from flask_cors import CORS
from places import places
from scripts import authenticate
from scripts import make_forecast
from scripts import get_query_now

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/places/<latitude>/<longitude>/<keyword>')
def get_places(latitude, longitude, keyword):
    return places(latitude, longitude, keyword)


@app.route('/authenticate')
def get_authenticate():
    return authenticate()
