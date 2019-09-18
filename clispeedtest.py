import datetime
import io

import speedtest
import logging
import os


def get_speed():
    logging.debug("Starting speed test")
    current_test = speedtest.Speedtest()
    current_test.get_servers()
    current_test.get_best_server()
    current_test.download()
    results_dict = current_test.results.dict()
    # return the download speed in terms of MB/s
    raw_speed = results_dict['download']
    logging.debug("Download speed test result is {} bit/s".format(raw_speed))
    speed = round((raw_speed / 8000000), 2)
    logging.debug("Download speed test result is {} MB/s".format(speed))
    return speed


def get_datetime():
    test_date_time = datetime.datetime.now().strftime("%Y-%m-%d_%H:%M")
    logging.debug("Current test time is {}".format(test_date_time))
    return test_date_time


def get_dict():
    return {
        get_datetime(): get_speed()
    }


def startup_filecheck():
    path = "./recordings.json"
    if os.path.isfile(path) and os.access(path, os.R_OK):
        print("found file is readable")
    else:
        print("file missing or not readable")
        print("creating file")
        with io.open(os.path.join(path, "recordings.json"), 'w') as db_file:



if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG)
    logging.debug("Starting up Python script")
    get_dict()
