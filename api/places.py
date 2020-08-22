import requests
import json
import config
import concurrent.futures

from scripts import get_busyness


def get_photo(location):
    photo_reference = location[4]
    api_url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&"
    params_url = "photoreference=" + photo_reference + "&key=" + config.gmap_api_key
    request_url = api_url + params_url
    response = requests.get(request_url)
    return str(response.url)


def get_photos(res):
    with concurrent.futures.ThreadPoolExecutor(10) as executor:
        intermediateResults = executor.map(get_photo, res)
        finalResults = []
        for i in range(res):
            element = res[i][:4]
            element.append(intermediateResults[i])
            finalResults.append(element)
        return finalResults


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
        photo_reference = ""
        if "photos" in response["results"][i] and len(response["results"][i]["photos"]) > 0:
            photo_reference = response["results"][i]["photos"][0]["photo_reference"]
        places.append((name, address, photo_reference))
    res = get_busyness(places)
    photo_res = get_photos(res)
    return json.dumps(photo_res)
