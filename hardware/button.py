import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
import time

taken_num = 0
snooze_num = 0
t_last_press = time.time()
snooze_press = time.time()

def taken_button_callback(channel):
    global t_last_press
    if(time.time() - t_last_press > 3):
        t_last_press = time.time()
        global taken_num
        taken_num = taken_num + 1
        print(taken_num)

def snooze_button_callback(channel):
    global snooze_press
    if(time.time() - snooze_press > 3):
        snooze_press = time.time()
        global snooze_num
        snooze_num = snooze_num + 1
        print(snooze_num)

GPIO.setwarnings(False) # Ignore warning for now
GPIO.setmode(GPIO.BOARD) # Use physical pin numbering
GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # Set pin 10 to be an input pin and set initial value to be pulled low (off)
GPIO.add_event_detect(10,GPIO.RISING,callback=taken_button_callback) # Setup event on pin 10 rising edge
GPIO.setup(8, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # Set pin 8 to be an input pin and set initial value to be pulled low (off)
GPIO.add_event_detect(8,GPIO.RISING,callback=snooze_button_callback) # Setup event on pin 8 rising edge

message = input("Press enter to quit\n\n") # Run until someone presses enter

GPIO.cleanup() # Clean up