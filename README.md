# ISP Speed: Expectations vs Reality

## Description

The motivation for this project came from my curiosity to visualize the download speed provided by my Internet Service Provider (ISP) across hours/days/weeks/months.

Over months, I collected data from speed tests and saved into a json file. 

A front-end is in development to visualize all the data collected.

---
![GitHub](https://img.shields.io/github/license/gpnn/isp-speed-expectation-vs-reality?style=flat-square)

![GitHub top language](https://img.shields.io/github/languages/top/gpnn/isp-speed-expectation-vs-reality?style=flat-square)
![GitHub language count](https://img.shields.io/github/languages/count/gpnn/isp-speed-expectation-vs-reality?style=flat-square)

![GitHub commit activity](https://img.shields.io/github/commit-activity/m/gpnn/isp-speed-expectation-vs-reality?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/gpnn/isp-speed-expectation-vs-reality?style=flat-square)

## Built with / technologies

- Python: program to collect the speed test data at random times
    - speedtest library
- Node.js and Express.js for the API endpoints
- React.js and Bootstrap CSS framework to build the front-end
    - ApexChart.js: charts library

## Features

Visualize speed test data across hours/days/weeks/months

## Getting started

### Prerequisites

- Python3
- Node.js

### Installing

1.  Clone the repo
2.  Install the Python requirements and Node dependencies
````bash
pip3 install -r requirements.txt
npm run installall
````

### Configuration

### Usage

To collect data:

```bash
python3 ./DataCollector/speedtest_collector.py
```

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

Data collection can be automated through Jenkins on a server of some sort. 

## Roadmap / Todo
- [ ] Finish frontend
    - [ ] Generate charts

## License

[MIT License](https://choosealicense.com/licenses/mit/)