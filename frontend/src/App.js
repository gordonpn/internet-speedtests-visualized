import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <div className="container">
                <div className="card border-0 shadow my-5">
                    <div className="card-body p-5">
                        <h1 className="font-weight-light">ISP Speed Expectations vs Reality</h1>
                        <p className="lead">Over several months, I collected speedtest data to compare with what the
                            Internet Service Provider advertises and the reality of it<br/>This page shows the results
                            using graphs</p>
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <img className="img-fluid" src="http://placehold.it/750x500" alt=""/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
