# Import libraries
import RPi.GPIO as GPIO
import time

def moter():
    # Set GPIO numbering mode
    #GPIO.setmode(GPIO.BOARD)

    # Set pin 11 as an output, and set servo1 as pin 11 as PWM
    GPIO.setup(11,GPIO.OUT)
    servo1 = GPIO.PWM(11,50) # Note 11 is pin, 50 = 50Hz pulse

    #start PWM running, but with value of 0 (pulse off)
    servo1.start(0)
    time.sleep(0.25)

    # Define variable duty
    duty = 2

    # Loop for duty values from 2 to 12 (0 to 180 degrees)
    while duty <= 12:
        servo1.ChangeDutyCycle(duty)
        time.sleep(0.010)
        duty = duty + 1

    # Wait a couple of seconds
    time.sleep(0.2)

    servo1.ChangeDutyCycle(0)

    #Clean things up at the end
    servo1.stop()
    #GPIO.cleanup()