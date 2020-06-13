import React, { useEffect, useState } from "react";
import * as PropTypes from "prop-types";
import Axios from "axios";
import Chart from "react-apexcharts";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Skeleton from "react-loading-skeleton";

const getSubtitle = (type) => {
  switch (type) {
    case "hours": {
      return "Speeds shown across a day";
    }
    case "days": {
      return "Speed on each day of the year";
    }
    case "weekdays": {
      return "Speeds across the week";
    }
    case "weeks": {
      return "Speed for each week of the year";
    }
    case "months": {
      return "Speeds across months";
    }
    default: {
      return "";
    }
  }
};

export default function Charts(props) {
  const { type } = props;
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState({
    options: {
      xaxis: {
        categories: [],
        labels: {
          show: true,
        },
      },
      yaxis: {
        decimalsInFloat: 1,
        max: 50,
        min: 10,
      },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "16px",
        },
      },
      subtitle: {
        text: "",
        align: "center",
        style: {
          fontSize: "14px",
        },
      },
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      colors: ["#9FCAFE"],
    },
    series: [
      {
        name: "Speed (MB/s)",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await Axios.get(`/api/v1/speedtests/${type}`);
      const keys = [];
      const values = [];
      Object.entries(result.data).forEach(([key, value]) => {
        keys.push(key);
        values.push(value);
      });
      const maxValue = Math.max(...values) + 1;
      const minValue = Math.min(...values) - 1;
      const updatedOptions = { ...state };
      updatedOptions.options.xaxis.categories = [...keys];
      updatedOptions.series[0].data = [...values];
      updatedOptions.options.yaxis.max = maxValue;
      updatedOptions.options.yaxis.min = minValue;
      updatedOptions.options.title.text = `${type
        .charAt(0)
        .toUpperCase()}${type.slice(1)}`;
      updatedOptions.options.subtitle.text = getSubtitle(type);
      setState(updatedOptions);
      setLoaded(true);
    };
    fetchData();
  }, []);

  if (loaded) {
    return (
      <>
        <Row>
          <Col>
            <Chart options={state.options} series={state.series} type="line" />
          </Col>
        </Row>
        <br />
      </>
    );
  }
  return <Skeleton height={300} />;
}

Charts.propTypes = {
  type: PropTypes.oneOf(["hours", "days", "weekdays", "weeks", "months"]),
};

Charts.defaultProps = {
  type: null,
};
