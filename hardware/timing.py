from datetime import datetime 
from datetime import timedelta
import requests
import urllib
import time
import os
import json
import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
import moter


taken_num = 0
snooze_num = 0
t_last_press = time.time()
snooze_press = time.time()

button_pressed = 0

def taken_button_callback(channel):
    global t_last_press
    if(time.time() - t_last_press > 3):
        t_last_press = time.time()
        global taken_num
        taken_num = taken_num + 1
        global button_pressed
        button_pressed = 1

def snooze_button_callback(channel):
    global snooze_press
    if(time.time() - snooze_press > 3):
        snooze_press = time.time()
        global snooze_num
        snooze_num = snooze_num + 1
        global button_pressed
        button_pressed = 2

def init():
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

        print(file_data)

    #if file does not exist check wifi connection
    status = ""
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
        "time" : now.replace(minute=0, second=0, microsecond=0) + timedelta(hours = 1),
        "interval" : 60,
        "vibrations" : 0
    })
    print(medications)

    for med in medications['medications']:
        print(med)
        event = {
            "name" : med["name"],
            "id" : med["id"],
            "time" : next_time(datetime.strptime(med["new_time"], '%Y-%m-%d %H:%M:%S'), med["interval"], now),
            "interval" : med["interval"],
            "vibrations" : med["vibrations"]
        }
        events.append(event)
        
    return events

def main(medications):            
    events = build_events(medications)
    print(events)

    timeout_time = 10

    while True:

        #sets the next event to trigger
        active_event = events[0]
        for event in events:
            print(event)
            if event["time"] < active_event["time"]:
                active_event = event

        print(active_event["name"])

        time_until = (active_event["time"] - datetime.now()).total_seconds()

        if(time_until > 0):
            print(time_until)
            time.sleep(time_until)

        #trigger api call or moter event
        if(active_event["id"] == 0):
            pass
            #api call to check if there are changes 
        else:
            for i in range(active_event["vibrations"]):
                moter.moter()

            global button_pressed
            button_pressed = 0
            start_time = time.time()
            while True:
                if time.time() - start_time > 10:
                    print(f"timed out {active_event['name']}")
                    active_event["time"] += timedelta(minutes=5)
                    break
                if button_pressed == 1:
                    pass
                    #store api request

                    #update the dictionary with the next event
                    print(f"triggering event {active_event['name']}")
                    active_event["time"] += timedelta(minutes=active_event["interval"])
                    break
                elif button_pressed == 2:
                    print(f"sleeping event {active_event['name']}")
                    active_event["time"] += timedelta(minutes=5)
                    break
                time.sleep(0.1)
        

if __name__ == "__main__":
    init()
