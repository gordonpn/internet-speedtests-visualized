import datetime
import json
import logging
import os
import random
import time

import speedtest


def get_speed():
    logger.debug("Starting speed test")
    instant_speed = 0
    try:
        current_test = speedtest.Speedtest()
        current_test.get_servers()
        current_test.get_best_server()
        logger.info("Speed test in progress...")
        current_test.download()
        results_dict = current_test.results.dict()
        raw_speed = results_dict['download']
        instant_speed = round((raw_speed / 8000000), 2)
        logger.debug("Download speed test result is {} MB/s".format(instant_speed))
    except speedtest.ConfigRetrievalError as e:
        logger.error(str(e))
    return instant_speed


def get_datetime():
    test_date_time = datetime.datetime.now().strftime("%Y-%m-%d_%H:%M")
    logger.debug("Current test time is {}".format(test_date_time))
    return test_date_time


def get_dict():
    return get_datetime(), get_speed()


def update_data():
    data_json = "speedtest_data.json"
    if os.path.exists(data_json):
        try:
            logger.info("Opening existing json")
            with open(data_json, "r") as read_file:
                data = json.load(read_file)
        except ValueError:
            logger.error("File was empty, creating new data")
            data = {}

        data[date_time] = speed
    else:
        data = {date_time: speed}

    logger.info("Writing new data into the json")
    with open(data_json, "w+") as write_file:
        json.dump(data, write_file, indent=4)


def get_random_times():
    random_wait_times = []
    while len(random_wait_times) < 5:
        random_wait_times.append(random.randint(0, 30))
        random_wait_times = list(dict.fromkeys(random_wait_times))

    logger.info("Random wait times: ")
    logger.info(random_wait_times)
    return random_wait_times


if __name__ == '__main__':
    logger = logging.getLogger()
    logger.setLevel(logging.DEBUG)
    logger.addHandler(logging.StreamHandler())
    logger.debug("Starting up Python script")

    wait_time = get_random_times()

    for time_to_wait in wait_time:
        logger.info("Waiting {} minutes until next test".format(time_to_wait))
        time.sleep(int(time_to_wait) * int(60))
        date_time, speed = get_dict()
        if speed != 0:
            update_data()
        else:
            logger.info("Could not connect to internet, skipping this test")
