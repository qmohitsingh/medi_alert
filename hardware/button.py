import RPi.GPIO as GPIO # Import Raspberry Pi GPIO library
import time

num = 0
last_press = time()

def button_callback(channel):
    global last_press
    if(time() - last_press > 3):
        last_press = time()
        global num
        num = num + 1
        print(num)

GPIO.setwarnings(False) # Ignore warning for now
GPIO.setmode(GPIO.BOARD) # Use physical pin numbering
GPIO.setup(10, GPIO.IN, pull_up_down=GPIO.PUD_DOWN) # Set pin 10 to be an input pin and set initial value to be pulled low (off)
GPIO.add_event_detect(10,GPIO.RISING,callback=button_callback) # Setup event on pin 10 rising edge

message = input("Press enter to quit\n\n") # Run until someone presses enter

GPIO.cleanup() # Clean up