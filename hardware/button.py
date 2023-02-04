import RPi.GPIO as GPIO
import time

BUTTON_GPIO = 10
if __name__ == '__main__':
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(BUTTON_GPIO, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
    pressed = False
    while True:
        # button is pressed when pin is LOW
        if GPIO.input(BUTTON_GPIO):
            if not pressed:
                print("1")
                pressed = True
        # button not pressed (or released)
        else:
            pressed = False
        time.sleep(0.1)