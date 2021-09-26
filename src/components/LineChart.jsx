import React from "react";
import { Line } from "react-chartjs-2";
import millify from "millify";
import moment from "moment";

const LineChart = ({ coinHistory, timeFormat, timeIndex, change }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory.data.history[i].price);

    let d = new Date(coinHistory.data.history[i].timestamp);
    d = moment(d).format(timeFormat[timeIndex]);

    coinTimestamp.push(d);
  }

  let theme = change >= 0 ? "#86D038" : "#FE6F6F";

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: theme,
        borderColor: theme,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.5,
        borderJoinStyle: "round",
      },
      point: {
        rotation: 0,
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltips: {
        mode: "index",
        intersect: false,
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      y: {
        grid: {
          color: `${theme}00`,
        },
        beginAtZero: false,
        ticks: {
          callback: function (value, index, values) {
            return millify(value);
          },
          display: false,
          padding: 0,
          color: theme,
        },
      },
      x: {
        grid: {
          color: `${theme}00`,
        },
        ticks: {
          padding: 0,
          color: theme,
          display: false,
        },
      },
    },
  };

  return (
    <div
      style={{ minHeight: "80vh" }}
      className="bg-base-200 shadow-xl rounded-box select-none"
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
