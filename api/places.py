import config
import gmap
import requests
import json

from scripts import get_busyness


def places(latitude, longitude, keyword):
    api_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    location = latitude + "," + longitude
    params = "?location=" + location + "&keyword=" + \
        keyword + "&rankby=distance" + "&key=" + config.gmap_api_key
    request_url = api_url + params
    response = requests.get(request_url).json()
    places = []
    max_results = min(10, len(response["results"]))
    for i in range(max_results):
        name = response["results"][i]["name"]
        address = response["results"][i]["vicinity"]
        places.append((name, address))

    res = get_busyness(places)

    return json.dumps(res)
