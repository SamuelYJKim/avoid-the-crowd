import requests
import json
import config
import concurrent.futures

from scripts import get_busyness

# gets one photo of the location
def get_photo(location):
    photo_reference = location[4]
    if len(photo_reference) == 0:
        return ""
    api_url = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&"
    params_url = "photoreference=" + photo_reference + "&key=" + config.gmap_api_key
    request_url = api_url + params_url
    response = requests.get(request_url)
    return str(response.url)

# get all requests concurrently
def get_all_photos(res):
    with concurrent.futures.ThreadPoolExecutor(10) as executor:
        intermediateResults = executor.map(get_photo, res)
        finalResults = []
        for res_element, intermediate_element in zip(res, intermediateResults):
            element = res_element[:4] + [intermediate_element]
            finalResults.append(element)
        return finalResults

# after getting reference from photo location, make a new search to find more photos of the location
def get_photo_references(place_id):
    api_url = "https://maps.googleapis.com/maps/api/place/details/json?fields=photo"
    params_url = "&place_id=" + place_id + "&key=" + config.gmap_api_key
    request_url = api_url + params_url
    response = requests.get(request_url).json()["result"]
    if response and "photos" in response and len(response["photos"]) > 0:
        return response["photos"][0]["photo_reference"]
    return ""


# to handle multiple requests
def get_all_photo_references(place_ids):
     with concurrent.futures.ThreadPoolExecutor(10) as executor:
        results = executor.map(get_photo_references, place_ids)
        return list(results)

def places(latitude, longitude, keyword):
    api_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    location = latitude + "," + longitude
    params = "?location=" + location + "&keyword=" + \
        keyword + "&rankby=distance" + "&key=" + config.gmap_api_key
    request_url = api_url + params
    response = requests.get(request_url).json()
    places = []
    max_results = min(10, len(response["results"]))
    place_ids = []
    for i in range(max_results):
        place_ids.append(response["results"][i]["place_id"])
    photo_references = get_all_photo_references(place_ids)
    print(photo_references)
    for i in range(max_results):
        place_id = response["results"][i]["place_id"]
        name = response["results"][i]["name"]
        address = response["results"][i]["vicinity"]
        places.append((name, address, photo_references[i]))
    res = get_busyness(places)
    photo_res = get_all_photos(res)
    return json.dumps(photo_res)
