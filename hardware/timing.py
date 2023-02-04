from datetime import datetime 
import requests
import urllib
import time
import os
import json


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
        #TODO If its changed save the med info to file

    main(file_data)

def main(events):
    pass
    while True:
        pass

        
        #check to see when the next medication is or api check is schedualed

        #sleep until next event

        #trigger api call or moter event

        #update the dictionary with the next event

if __name__ == "__main__":
    __init__()
