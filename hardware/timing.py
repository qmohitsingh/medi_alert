from datetime import datetime 
from datetime import timedelta
import requests
import urllib
import time
import os
import json
import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
import moter
import sys


taken_num = 0
snooze_num = 0
t_last_press = time.time()
snooze_press = time.time()

button_pressed = 0
user_id = 1

File_name = "med_data.json"

def taken_button_callback(channel):
    print("taken button press")
    global t_last_press
    if(time.time() - t_last_press > 3):
        t_last_press = time.time()
        global taken_num
        taken_num = taken_num + 1
        global button_pressed
        print("taken button press processed")
        button_pressed = 1

def snooze_button_callback(channel):
    global snooze_press
    print("snooze button press")
    if(time.time() - snooze_press > 3):
        snooze_press = time.time()
        global snooze_num
        snooze_num = snooze_num + 1
        global button_pressed
        print("snooze button press processed")
        button_pressed = 2

def init():
    #check med info file status

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

        print(file_data)

    #test to see if the dict is up to date
    url = "http://3.92.112.184:3005/meds/"
    api_resp = requests.get(url + f"{user_id}")

    if(api_resp.status_code == 200):
        api_data = []
        api_response_json = api_resp.json()
        for i in api_response_json["data"]:
            print("\n")
            print(i)

            medication = {
                "name" : i["med_name"],
                "id" : i["med_id"],
                "new_time" : datetime.strptime(i["next_time"], '%Y-%m-%dT%H:%M:%S.%f%z').replace(minute=0, second=0, microsecond=0).strftime('%Y-%m-%d %H:%M:%S'),
                "interval" : i["interval_time"],
                "vibrations" : i["vibration"]
            }
            api_data.append(medication)

        api_json = {
            "medications" : api_data
        }

        if(file_data != api_json):
            file_data = api_json
            with open(File_name, 'w') as file:
                json.dump(file_data, file, indent=4)

        #update the file and use the new data

    GPIO.setwarnings(False) # Ignore warning for now
    GPIO.setmode(GPIO.BOARD) # Use physical pin numbering
    GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # Set pin 10 to be an input pin and set initial value to be pulled low (off)
    GPIO.add_event_detect(10,GPIO.RISING,callback=taken_button_callback) # Setup event on pin 10 rising edge
    GPIO.setup(8, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # Set pin 8 to be an input pin and set initial value to be pulled low (off)
    GPIO.add_event_detect(8,GPIO.RISING,callback=snooze_button_callback) # Setup event on pin 8 rising edge


    main(file_data)


def next_time(time, interval, now):
    while time < now:
        time += timedelta(minutes = interval)

    return time

def build_events(medications):
    #build the event list
    events = []

    now = datetime.now()

    events.append( {
        "name" : "check_api",
        "id" : 0,
        "time" : now.replace(second=0, microsecond=0) + timedelta(minutes = 1),
        "alert_time" : now.replace(second=0, microsecond=0) + timedelta(minutes = 1),
        "interval" : 1,
        "vibrations" : 0
    })
    print(medications)

    for med in medications['medications']:
        print(med)
        event = {
            "name" : med["name"],
            "id" : med["id"],
            "time" : next_time(datetime.strptime(med["new_time"], '%Y-%m-%d %H:%M:%S'), med["interval"], now),
            "alert_time" : next_time(datetime.strptime(med["new_time"], '%Y-%m-%d %H:%M:%S'), med["interval"], now),
            "interval" : med["interval"],
            "vibrations" : med["vibrations"]
        }
        events.append(event)
        
    return events

def main(medications):            
    events = build_events(medications)
    print(events)

    
    upload = []
    while True:

        #sets the next event to trigger
        active_event = events[0]
        for event in events:
            print(event)
            if event["alert_time"] < active_event["alert_time"]:
                active_event = event

        print(active_event["name"])

        time_until = (active_event["alert_time"] - datetime.now()).total_seconds()

        if(time_until > 0):
            print(time_until)
            time.sleep(time_until)

        #trigger api call or moter event
        if(active_event["id"] == 0):
            print("api being used")
            url = "http://3.92.112.184:3005/meds"
            api_resp = requests.get(url + f"/{user_id}")

            if(api_resp.status_code == 200):
                print("recived medication info")
                api_data = []
                api_response_json = api_resp.json()
                for i in api_response_json["data"]:
                    print("\n")
                    print(i)

                    medication = {
                        "name" : i["med_name"],
                        "id" : i["med_id"],
                        "new_time" : datetime.strptime(i["next_time"], '%Y-%m-%dT%H:%M:%S.%f%z').replace(minute=0, second=0, microsecond=0).strftime('%Y-%m-%d %H:%M:%S'),
                        "interval" : i["interval_time"],
                        "vibrations" : i["vibration"]
                    }
                    api_data.append(medication)

                api_json = {
                    "medications" : api_data
                }

                if(medications != api_json):
                    print("info does not match")

                    print("\n")
                    print(medications)
                    print(api_json)
                    print("\n")
                    medications = api_json
                    with open(File_name, 'w') as file:
                        json.dump(medications, file, indent=4)


                    stored_events = []
                    for event in events:
                        if event["alert_time"] != event["time"]:
                            stored_events.append(event)
                    events = build_events(medications)

                    print(events)

                    print(stored_events)

                    for event in stored_events:
                        for alert in events:
                            if alert["id"] == event["id"]:
                                alert["time"] = event["time"]
                                alert["alert_time"] = event["alert_time"]

                else:
                    active_event["time"] += timedelta(minutes=active_event["interval"])
                    active_event["alert_time"] += timedelta(minutes=active_event["interval"])

            print(events)

            print(upload)
            if not upload == []:
                status = requests.post(url, data = json.dumps(upload, indent=4))
                print("\n\n")
                print("STATUS:")
                print(status)
                print("\n\n")
                if(status == 200):
                    upload = []


        else:
            for i in range(active_event["vibrations"]):
                moter.moter()

            global button_pressed
            button_pressed = 0
            print(button_pressed)
            start_time = time.time()
            while True:
                if button_pressed == 1:
                    #store api request
                    upload.append({
                        "med_id" : active_event["id"],
                        "user_id" : user_id,
                        "time_taken" : active_event["time"].strftime('%Y-%m-%dT%H:%M:%S.%f%z'),
                        "delay" : (active_event["alert_time"] - active_event["time"]).total_seconds()
                    })
                    #update the dictionary with the next event
                    print(f"triggering event {active_event['name']}")
                    active_event["alert_time"] = active_event["time"] + timedelta(minutes=active_event["interval"])
                    active_event["time"] += timedelta(minutes=active_event["interval"])
                    break
                elif button_pressed == 2:
                    print(f"sleeping event {active_event['name']}")
                    active_event["alert_time"] += timedelta(minutes=5)
                    break
                if time.time() - start_time > 10:
                    print(f"timed out {active_event['name']}")
                    active_event["alert_time"] += timedelta(minutes=5)
                    break
                time.sleep(2)
        

if __name__ == "__main__":
    init()
