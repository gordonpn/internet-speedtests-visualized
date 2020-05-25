import React from "react";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Content from "./components/Content";
import "./App.css";

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="App">
      <Container>
        <Card className="border-0 shadow my-5">
          <Card.Body className="p-5">
            <h1 className="font-weight-light">
              Internet Speed Tests Visualized
            </h1>
            <br />
            <p className="lead">
              I collected speedtest data out of curiosity to visualize change
              and trends. Here are the results.
            </p>
            <br />
            <hr />
            <Container id="content-desktop">
              <Content />
            </Container>
            <Container id="content-mobile">
              <h4>
                Please revisit this site on a desktop or laptop, mobile is too
                small to display the charts correctly.
              </h4>
              <p>If you are using a computer, try making it full width.</p>
            </Container>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default App;
