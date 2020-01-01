import datetime
import json
import os
import random
import time
from typing import Dict

import speedtest

from Configuration.logger import get_logger


class SpeedtestCollector:
    PATH: str = 'data.json'

    def __init__(self):
        self.logger = get_logger()

    def run(self):
        time.sleep(self.random_delay())
        data = self.collect()
        self.save(data)

    def random_delay(self) -> int:
        random_time: int = random.randint(0, 30) * 60
        self.logger.debug(f"Wait time unless next: {random_time} seconds")
        return random_time

    def collect(self) -> float:
        self.logger.debug("Starting speed test")
        current_test = speedtest.Speedtest()
        current_test.get_servers()
        current_test.get_best_server()
        self.logger.info("Speed test in progress...")
        current_test.download()
        results_dict = current_test.results.dict()
        raw_speed = results_dict.get('download')
        instant_speed: float = round((raw_speed / 8000000), 2)
        self.logger.debug(f"Download speed test result is {instant_speed} MB/s")
        return instant_speed

    def save(self, data):
        date_time: str = datetime.datetime.now().strftime("%Y-%m-%d_%H:%M")
        if os.path.exists(SpeedtestCollector.PATH):
            try:
                self.logger.info("Opening existing json")
                with open(SpeedtestCollector.PATH, "r") as read_file:
                    data_from_json = json.load(read_file)
            except ValueError:
                self.logger.error("File was empty, creating new data")
                data: Dict[str, float] = {}

            data_from_json[date_time] = data
        else:
            data_from_json = {date_time: data}

        self.logger.info("Writing new data into the json")
        with open(SpeedtestCollector.PATH, "w+") as write_file:
            json.dump(data_from_json, write_file, indent=4)


if __name__ == '__main__':
    speedtest_collector = SpeedtestCollector()
    speedtest_collector.run()
