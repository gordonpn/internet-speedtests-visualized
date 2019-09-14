import datetime

import speedtest


def get_speed():
    s = speedtest.Speedtest()
    s.get_servers()
    s.get_best_server()
    s.download()
    results_dict = s.results.dict()
    speed = results_dict['download'] / 8000000
    return speed


def get_datetime():
    testdatetime = datetime.datetime.now().strftime("%Y-%m-%d_%H:%M")
    return testdatetime


def get_dict():
    return {
        get_datetime(): get_speed()
    }
