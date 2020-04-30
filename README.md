# ISP Speed: Expectations vs Reality

## Motivation

Mostly curiosity about how my home internet speed varies throughout the hours, days, weeks, months.

## Description

The project is split into three Docker containers. One to perform the speedtests (scrape), one for the backend and another for the frontend.

---
[![Build Status](https://drone.gordon-pn.com/api/badges/gordonpn/isp-speed-expectation-vs-reality/status.svg)](https://drone.gordon-pn.com/gordonpn/isp-speed-expectation-vs-reality)
![Healthchecks.io](https://healthchecks.io/badge/b37af876-e3fd-4dbd-9f62-b59fbd16fcf1/uryOUBpi.svg)
![Last commit on develop](https://badgen.net/github/last-commit/gordonpn/isp-speed-expectation-vs-reality/develop)
![License](https://badgen.net/github/license/gordonpn/isp-speed-expectation-vs-reality)

## Built with / technologies

- Python: program to collect the speed test data at random times
    - speedtest library
- Node.js and Express.js for the API endpoints
- React.js and Bootstrap CSS framework to build the front-end
    - ApexChart.js: charts library

## Getting started

### Prerequisites

- Python3
- Node.js
- Docker and docker-compose

### Installing

1.  Clone the repo
2.  Install the Python requirements and Node dependencies
````bash
pip install -r requirements.txt
npm run installall
````

### Configuration

### Usage

To run the backend:

```bash
cd ./backend && npm start
```

To run the frontend for development purposes:

```bash
cd ./frontend && npm start
```

Or to start both:

````bash
npm run start
````

#### Use cases

Data scraping can be automated through any cron-like environment on server of some sort.

## Roadmap / Todo
- [x] Finish frontend
    - [x] Generate charts
- [ ] Max and min lines for weekly and daily charts

## License

[MIT License](./LICENSE)
