import requests
import json
import priv
import pub
import config
import datetime
from datetime import datetime


forecasts = {}
nameBusyness = {}
sortedList = []


def authenticate():
    url = "https://besttime.app/api/v1/keys/" + config.best_times_private_key
    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    print(response.text.encode('utf8'))
    return "Hello World"


def make_forecast(name, address):
    url = "https://besttime.app/api/v1/forecasts"
    params = {
        'api_key_private': config.best_times_private_key,
        'venue_name': name,
        'venue_address': address
    }

    response = requests.request("POST", url, params=params)
    data = json.loads(response.text)
    # with open('data.txt') as json_file:
    #     data = json.load(json_file)

    # Check if no data for location
    if "analysis" in data:
        current_busyness_txt = data["analysis"][datetime.today().weekday(
        )]["hour_analysis"][(datetime.now().hour - 6) % 24]["intensity_txt"]

        current_busyness_value = data["analysis"][datetime.today().weekday(
        )]["hour_analysis"][(datetime.now().hour - 6) % 24]["intensity_nr"]
    else:
        current_busyness_txt = "nothing"
        current_busyness_value = -10

    if "venue_id" in data["venue_info"]:
        forecasts[address] = data["venue_info"]["venue_id"]
    return [current_busyness_value, current_busyness_txt, name, address]


# get query at current time


def get_query_now(venue_id):
    url = "https://besttime.app/api/v1/forecasts/now"

    params = {
        'api_key_public': config.best_times_public_key,
        'venue_id': venue_id
    }

    response = requests.request("GET", url, params=params)
    data = json.loads(response.text)

    # Check if no data for location
    if "analysis" in data:
        current_busyness_txt = data['analysis']["hour_analysis"]["intensity_txt"]
        current_busyness_value = data['analysis']["hour_analysis"]["intensity_nr"]
    else:
        current_busyness_txt = "nothing"
        current_busyness_value = -10
    return [current_busyness_value, current_busyness_txt]


def get_busyness(places):
    places_list = []
    for tup in places:
        if tup[1] in forecasts:
            # query => public key
            venue_id = forecasts[tup[1]]
            res = get_query_now(venue_id)
            res.append(tup[0])
            res.append(tup[1])
            places_list.append(res)
        else:
            # forecast => private key
            res = make_forecast(tup[0], tup[1])
            places_list.append(res)

    i = 0
    while i < len(places_list):
        if places_list[i][0] == -10 or places_list[i][0] == "N/A":
            places_list.pop(i)
        else:
            places_list[i][0] = int(places_list[i][0])
            i += 1
    return sorted(places_list)
