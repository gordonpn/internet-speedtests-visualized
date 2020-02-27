import React from "react";
import Chart from "react-apexcharts";
import Axios from "axios";

class HourlyChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                xaxis: {
                    categories: [],
                    labels: {
                        show: false
                    }
                },
                yaxis: {
                    decimalsInFloat: 1,
                    max: 43,
                    min: 38
                },
                title: {
                    text: 'Hourly Graph',
                    align: 'center'
                },
                subtitle: {
                    text: 'Average internet speed throughout a day.',
                    align: 'center'
                },
                stroke: {
                    curve: 'smooth'
                },
                markers: {
                    size: 0
                },
                colors: ["#9fcafe"]
            },
            series: [
                {
                    name: "Speed (MB/s)",
                    data: []
                }
            ]
        };
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        await Axios.get('/api/hourly')
            .then(result => {
                let xaxis = [];
                let yaxis = [];
                result.data.forEach(item => {
                    xaxis.push(item[0]);
                    yaxis.push(item[1])
                });
                const max_value = Math.max(...yaxis) + 1;
                const min_value = Math.min(...yaxis) - 1;
                this.setState({
                    options: {
                        xaxis: {
                            categories: xaxis
                        },
                        yaxis: {
                            max: max_value,
                            min: min_value
                        }
                    },
                    series: [
                        {
                            data: yaxis
                        }
                    ]
                })
            })
    }

    render() {
        return (
            <div>
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                />
            </div>
        );
    }
}

export default HourlyChart;