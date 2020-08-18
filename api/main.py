import requests
import json
from flask import Flask
from flask_cors import CORS
from places import places
from scripts import authenticate

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# given latitute, longitutde and keyword, find places
@app.route('/places/<latitude>/<longitude>/<keyword>')
def get_places(latitude, longitude, keyword):
    return places(latitude, longitude, keyword)
