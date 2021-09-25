import React from "react";
import { Line } from "react-chartjs-2";
import millify from "millify";
import moment from "moment";

const LineChart = ({ coinHistory, timeFormat, timeIndex }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (
    let i = 0;
    i < coinHistory?.data?.history?.length;
    i += (timeIndex + 1) * (timeIndex + 2)
  ) {
    coinPrice.push(coinHistory.data.history[i].price);

    let d = new Date(coinHistory.data.history[i].timestamp);
    d = moment(d).format(timeFormat[timeIndex]);

    coinTimestamp.push(d);
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#fff",
        borderColor: "#fff",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.4,
        borderJoinStyle: "round",
      },
      point: {
        rotation: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: "#ffffff10",
        },
        beginAtZero: false,
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return millify(value);
          },
          padding: 0,
          color: "#fff",
        },
      },
      x: {
        grid: {
          color: "#ffffff00",
        },
        ticks: {
          padding: 0,
          color: "#fff",
        },
      },
    },
  };

  return (
    <div style={{ minHeight: "90vh" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
