import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import { LineChart, Loader } from ".";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timeperiod, setTimeperiod] = useState("24h");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timeperiod,
  });
  const cryptoDetails = data?.data?.coin;

  if (isFetching) return <Loader />;

  const time = ["24h", "7d", "30d", "1y", "5y"];
  const timeFormat = ["LT", "Do", "MMM Do", "MMM Do YY", "MMM Do YY"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails.price && millify(cryptoDetails.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails.volume && millify(cryptoDetails.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high",
      value: `$ ${millify(cryptoDetails.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails.approvedSupply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails.totalSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails.circulatingSupply)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          {data?.data?.coin.name} ({data?.data?.coin.slug})
        </h1>

        <p>
          {cryptoDetails.name} live price in US Dollar (USD). View value
          statistics, market cap and supply.
        </p>
      </div>
      <div className="flex lg:items-center justify-between flex-col lg:flex-row space-y-10 lg:space-y-0">
        <div className="shadow stats">
          <div className="stat bg-primary text-primary-content">
            <div className="stat-title">Current {cryptoDetails.name} Price</div>
            <div className="stat-value">
              $ {millify(cryptoDetails.price, { precision: 5 })}
            </div>
            <div className="stat-desc">{coinHistory?.data?.change}%</div>
          </div>
        </div>

        <select
          className="select select-bordered select-primary select-lg"
          onChange={(e) => setTimeperiod(e.target.value)}
          value={timeperiod}
        >
          {time.map((date, i) => (
            <option value={date} key={i}>
              {date}
            </option>
          ))}
        </select>
      </div>

      <LineChart
        coinHistory={coinHistory}
        currentPrice={millify(cryptoDetails.price)}
        coinName={cryptoDetails.name}
        timeFormat={timeFormat}
        timeIndex={time.indexOf(timeperiod)}
        change={coinHistory?.data?.change}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary">
              {cryptoDetails.name} Value Statistics
            </h2>

            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <tbody>
                {stats.map(({ icon, title, value }) => (
                  <tr key={title}>
                    <th className="flex items-center space-x-2">
                      {icon}
                      <span>{title}</span>
                    </th>
                    <td className="text-right">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-5">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-primary">
              Other Stats Info
            </h2>
            <p>
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <tbody>
                {genericStats.map(({ icon, title, value }) => (
                  <tr key={title}>
                    <th className="flex items-center space-x-2">
                      {icon}
                      <span>{title}</span>
                    </th>
                    <td className="text-right">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-primary">
            What is {cryptoDetails.name}?
          </h2>
          <div className="space-y-5">
            {HTMLReactParser(cryptoDetails.description)}
          </div>
        </div>
        <div className="space-y-5">
          <h2 className="text-2xl font-bold text-primary">
            {cryptoDetails.name} Links
          </h2>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <tbody>
                {cryptoDetails.links?.map((link, i) => (
                  <tr key={`${link.name} ${i}`}>
                    <th>{link.type}</th>
                    <td className="text-right">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer"
                        className="link link-primary"
                      >
                        {link.name}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
