# Internet Speed Tests Visualized

## Motivation

Mostly curiosity about how my home internet speed varies throughout the hours, days, weeks, months.

## Description

The project is split into three Docker containers. One to perform the speedtests (scrape data), one for the backend and another for the frontend.

---
[![Build Status](https://drone.gordon-pn.com/api/badges/gordonpn/internet-speedtests-visualized/status.svg)](https://drone.gordon-pn.com/gordonpn/internet-speedtests-visualized)
![Healthchecks.io](https://healthchecks.io/badge/b37af876-e3fd-4dbd-9f62-b59fbd16fcf1/uryOUBpi.svg)
![Last commit on develop](https://badgen.net/github/last-commit/gordonpn/internet-speedtests-visualized/develop)
![License](https://badgen.net/github/license/gordonpn/internet-speedtests-visualized)

## Built with / technologies

- Python: script in a Docker container to periodically scrape data
- Node.js and Express.js for the API endpoints
- React.js and Bootstrap CSS framework to build the front-end
  - ApexChart.js: charts library

## Getting started

### Prerequisites

- Python3
- Node.js
- Docker and docker-compose

### Installing

1. Clone the repo
2. Install the Python requirements and Node dependencies

````sh
pip install -r requirements.txt
npm run installall
````

### Configuration

### Usage

To run the backend for development purposes:

```sh
cd ./backend && npm run dev
```

To run the frontend for development purposes:

```sh
cd ./frontend && npm start
```

Or to start both:

````sh
npm run start
````

#### Use cases

Data scraping can be automated through any cron-like environment on server of some sort.

## Roadmap / Todo

Check out the [open issues](https://github.com/gordonpn/isp-speed-expectation-vs-reality/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) for ideas and features I have planned!

## Authors

Myself [@gordonpn](https://github.com/gordonpn)

## License

[MIT License](./LICENSE)
