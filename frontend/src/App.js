import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import HourlyChart from "./components/HourlyChart";
import WeeklyChart from "./components/WeeklyChart";
import DailyChart from "./components/DailyChart";

function App() {
    return (
        <div className="App">
            <Container>
                <Card className="border-0 shadow my-5">
                    <Card.Body className="p-5">
                        <h1 className="font-weight-light">ISP Speed Expectations vs Reality</h1><br/>
                        <p className="lead">Over several months, I collected speedtest data to compare with what the
                            Internet Service Provider advertises and the reality of it. While taking into factors such as how many devices are using the bandwidth and external factors.</p>
                        <br/>
                        <hr/>
                        <Container>
                            <Row>
                                <Col>
                                    <HourlyChart/>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <WeeklyChart/>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <DailyChart/>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default App;
