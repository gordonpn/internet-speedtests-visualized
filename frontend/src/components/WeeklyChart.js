import React from "react";
import Chart from "react-apexcharts";
import Axios from "axios";

class WeeklyChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                xaxis: {
                    categories: []
                },
                yaxis: {
                    decimalsInFloat: 1,
                    max: 42,
                    min: 39
                },
                title: {
                    text: 'Weekly Graph',
                    align: 'center'
                },
                subtitle: {
                    text: 'Average internet speed throughout a week.',
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
        await Axios.get('/api/weekly')
            .then(result => {
                const xaxis = [];
                const yaxis = [];
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

export default WeeklyChart;