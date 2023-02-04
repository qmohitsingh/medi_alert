from datetime import datetime 
from datetime import timedelta
import requests
import urllib
import time
import os
import json
import moter


def __init__():

    #check med info file status
    File_name = "med_data.json"

    #if file doesn't exist create it
    file = open(File_name,'a+')
    file.close()

    data_exists = False

    if os.stat(File_name).st_size==0:
        with open(File_name, 'w') as file:
            file_data = {
                    "medications" : []
            }
            json.dump(file_data, file, indent=4)
    else:
        with open(File_name, 'r') as file:
            file_data = json.load(file)
        data_exists = True

    #if file does not exist check wifi connection
    status = ""
    while status != "Connected":
        try:
            url = "https://www.google.com"
            urllib.urlopen(url)
            status = "Connected"
        except:
            status = "Not connected"
            if not data_exists:
                time.sleep(60)

    #test to see if the dict is up to date
    if(status == "Connected"):
        pass
        #TODO call api request and asses the dict
        api_data = {}

        if(file_data != api_data):
            pass
            #update the file and use the new data

    main(file_data)

def time_until(time):
    pass

def next_time(time, interval, now):
    while time < now:
        time + timedelta(minutes = interval)

    return time




def build_events(medications):
    #build the event list
    events = []

    now = datetime.now()

    events += {
        "name" : "check_api",
        "id" : 0,
        "time" : now + timedelta(hours = 1),
        "interval" : 3600,
        "vibrations" : 0
    }

    for med in medications:
        event = {
            "name" : med["name"],
            "id" : med["id"],
            "time" : next_time(med["new_time"], med["interval"], now),
            "interval" : med["interval"],
            "vibrations" : med["vibrations"]
        }
        events += event
        
    return events

def main(medications):            
    events = build_events(medications)

    while True:

        #sets the next event to trigger
        active_event = events[0]
        for event in events:
            if event["time"] < active_event["time"]:
                active_event = event

        time_until = (active_event["time"] - datetime.now()).total_seconds()

        if(time_until > 0):
            time.sleep(time_until)

        #trigger api call or moter event
        if(active_event["id"] == 0):
            pass
            #api call
        else:
            for i in range(active_event["vibrations"]):
                moter.moter()

        #update the dictionary with the next event
        active_event["time"] += timedelta(minutes=active_event["interval"])

if __name__ == "__main__":
    __init__()
