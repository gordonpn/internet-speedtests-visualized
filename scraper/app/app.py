import datetime
import logging
import os
import time
from logging.config import fileConfig

import schedule
import speedtest
from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database

from .healthcheck.healthcheck import HealthCheck, Status

logging.config.fileConfig("logging.ini", disable_existing_loggers=False)
logger = logging.getLogger("speedtest_scraper")


class SpeedtestScraper:
    def __init__(self):
        self.db_name = os.getenv("MONGO_INITDB_DATABASE")
        self.db_username = os.getenv("MONGO_NON_ROOT_USERNAME")
        self.db_password = os.getenv("MONGO_NON_ROOT_PASSWORD")
        self.db_collection = os.getenv("MONGO_COLLECTION")

    def run(self):
        logger.debug("Setting schedule")
        schedule.every(10).to(20).minutes.do(self.job)

        logger.debug("Job pending")
        while True:
            schedule.run_pending()
            time.sleep(1)

    def job(self):
        try:
            logger.debug("Starting up job")
            HealthCheck.ping_status(Status.START)
            speed_data: float = self.scrape()
            self.insert_to_db(speed_data)
            HealthCheck.ping_status(Status.SUCCESS)
            logger.debug("Job completed")
        except Exception as e:
            HealthCheck.ping_status(Status.FAILURE)
            logger.error(str(e))
            raise Exception

    def scrape(self) -> float:
        logger.debug("Starting speed test")
        current_test = speedtest.Speedtest()
        current_test.get_servers()
        current_test.get_best_server()
        logger.info("Speed test in progress...")
        current_test.download()
        results_dict = current_test.results.dict()
        raw_speed = results_dict.get("download")
        instant_speed: float = round((raw_speed / 8000000), 2)
        logger.debug(f"Download speed test result is {instant_speed} MB/s")
        return instant_speed

    def connect_to_db(self) -> Collection:
        logger.debug("Making connection to mongodb")
        if "DEV_RUN" in os.environ:
            host = "speedtest-mongodb-dev"
        else:
            host = "speedtest-mongodb"
        uri: str = f"mongodb://{self.db_username}:{self.db_password}@{host}:27017/{self.db_name}"
        connection: MongoClient = MongoClient(uri)
        db: Database = connection[self.db_name]
        return db.collection[self.db_collection]

    def insert_to_db(self, data: float) -> None:
        logger.debug("Inserting into collection")
        collection: Collection = self.connect_to_db()
        recorded_time = datetime.datetime.utcnow()
        collection.insert_one(document={"time": recorded_time, "speed": data})


def run():
    speedtest_scraper = SpeedtestScraper()
    speedtest_scraper.run()
