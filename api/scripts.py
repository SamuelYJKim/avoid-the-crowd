import requests
import json
import config
import datetime
import concurrent.futures

from datetime import datetime


forecasts = {}
nameBusyness = {}
sortedList = []

# method to authenticate with BestTime API


def authenticate():
    url = "https://besttime.app/api/v1/keys/" + config.best_times_private_key
    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    return response

# with the name and address, returns a list providing the busyness data, busyness description, name and address


def make_forecast(name, address):
    url = "https://besttime.app/api/v1/forecasts"
    params = {
        'api_key_private': config.best_times_private_key,
        'venue_name': name,
        'venue_address': address
    }

    response = requests.request("POST", url, params=params)
    data = json.loads(response.text)

    # Check if no data for location
    if "analysis" in data:
        current_busyness_txt = data["analysis"][datetime.today().weekday(
        )]["hour_analysis"][(datetime.now().hour - 6) % 24]["intensity_txt"]

        current_busyness_value = data["analysis"][datetime.today().weekday(
        )]["hour_analysis"][(datetime.now().hour - 6) % 24]["intensity_nr"]

        # quiet_hours = data["analysis"][datetime.today().weekday(
        # )]["quiet_hours"]
    else:
        current_busyness_txt = "nothing"
        current_busyness_value = -10
        # quiet_hours = []

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

# using a list of tuples, goes through and gathers data either from either creating a new forecast
# or querying data from a previously made forecast

# Creating a function that can look through the location and give a recommendation of
# what time the person should visit the place

# function to find hours that are not busy at a single location
# gives both quiet hours in the morning and in the evening


def get_quiet_hours(venue_id):
    url = "https://besttime.app/api/v1/forecasts/quiet"
    params = {
        'api_key_public': config.best_times_public_key,
        'venue_id': venue_id
    }

    response = requests.request("GET", url, params=params)
    data = json.loads(response.text)

    if "analysis" in data:
        quiet_hours_start_am = data['analysis']["quiet_hours"][0]["quiet_start_12"]
        quiet_hours_end_am = data['analysis']["quiet_hours"][0]["quiet_end_12"]
        quiet_hours_start_pm = data['analysis']["quiet_hours"][1]["quiet_start_12"]
        quiet_hours_end_pm = data['analysis']["quiet_hours"][1]["quiet_end_12"]
    else:
        quiet_hours_start_am = "nothing"
        quiet_hours_end_am = "nothing"
        quiet_hours_start_pm = "nothing"
        quiet_hours_end_pm = "nothing"

    return [quiet_hours_start_am, quiet_hours_end_am, quiet_hours_start_pm, quiet_hours_end_pm]


def collect_info(info):
    if info[1] in forecasts:
        # query => public key
        venue_id = forecasts[info[1]]
        res = get_query_now(venue_id)
        res.append(info[0])
        res.append(info[1])
        res.append(info[2])
    else:
        # forecast => private key
        res = make_forecast(info[0], info[1])
        res.append(info[2])
    return res


def get_busyness(places):
    places_list = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
        ret = []
        for tup in places:
            ret.append(executor.submit(collect_info, info=tup))
        for tup in concurrent.futures.as_completed(ret):
            places_list.append(tup.result())

    i = 0
    while i < len(places_list):
        if places_list[i][0] == -10 or places_list[i][0] == "N/A":
            places_list.pop(i)
        else:
            places_list[i][0] = int(places_list[i][0])
            i += 1
    return sorted(places_list)
