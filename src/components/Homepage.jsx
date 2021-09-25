import React from "react";
import millify from "millify";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News, Loader } from "../components";

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;

  return (
    <>
      <h1 className="text-3xl font-bold">Global Crypto Stats</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10">
        <div className="shadow stats">
          <div className="stat bg-primary text-primary-content">
            <div className="stat-title">Total Cryptocurrencies</div>
            <div className="stat-value">
              {millify(globalStats.total, { precision: 3 })}
            </div>
          </div>
        </div>

        <div className="shadow stats">
          <div className="stat bg-primary text-primary-content">
            <div className="stat-title">Total Exchanges</div>
            <div className="stat-value">
              {millify(globalStats.totalExchanges)}
            </div>
          </div>
        </div>

        <div className="shadow stats">
          <div className="stat bg-primary text-primary-content">
            <div className="stat-title">Total Market Cap</div>
            <div className="stat-value">
              {millify(globalStats.totalMarketCap, { precision: 2 })}
            </div>
          </div>
        </div>

        <div className="shadow stats">
          <div className="stat bg-primary text-primary-content">
            <div className="stat-title">Total 24h Volume</div>
            <div className="stat-value">
              {millify(globalStats.total24hVolume, { precision: 1 })}
            </div>
          </div>
        </div>

        <div className="shadow stats">
          <div className="stat bg-primary text-primary-content">
            <div className="stat-title">Total Markets</div>
            <div className="stat-value">
              {millify(globalStats.totalMarkets, { precision: 2 })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between flex-col space-y-5 sm:space-y-0 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">
          Top 10 Cryptocurrencies in the world
        </h2>

        <Link className="btn btn-primary btn-outline" to="/cryptocurrencies">
          Show More
        </Link>
      </div>

      <Cryptocurrencies simplified />

      <div className="flex items-start justify-between flex-col space-y-5 sm:space-y-0 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">Latest Crypto News</h2>

        <Link className="btn btn-primary btn-outline" to="/news">
          Show More
        </Link>
      </div>

      <News simplified />
    </>
  );
};

export default Homepage;
