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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
        <div className="shadow stats">
          <div className="stat bg-primary text-primary-content">
            <div class="stat-figure text-primary-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="fill-current w-10 h-10"
              >
                <path d="M256.198 0C114.804-.119.119 114.408 0 255.802S114.408 511.881 255.802 512c141.375-.119 255.98-114.625 256.198-256C512 114.685 397.513.119 256.198 0zm-.396 469.4c-117.855 0-213.399-95.545-213.399-213.4S137.947 42.601 255.802 42.601c117.815.119 213.28 95.584 213.399 213.399 0 117.855-95.544 213.4-213.399 213.4z"></path>
                <path d="M324.954 243.517c17.12-9.65 26.373-28.968 23.183-48.347-3.963-29.919-39.628-41.214-67.765-43.591v-44.978h-27.74v44.582h-18.625v-44.582h-27.74v44.582H150.39v28.731h20.805c9.313 0 13.87 2.774 13.87 10.303V313.66c0 10.303-5.152 13.474-10.7 13.474h-21.201v29.325h53.895v45.573h27.938v-45.573h18.625v45.573h27.146v-45.573h5.944c57.065 0 76.087-27.938 76.087-65.981-.456-22.431-16.01-41.73-37.845-46.961zm-90.948-61.82h19.814c13.87 0 41.214 2.378 41.214 24.966.951 14.742-9.729 27.661-24.372 29.523h-36.656v-54.489zm30.712 142.662v-.198h-30.712v-59.443h35.666c8.322 0 39.628 2.774 39.628 24.966s-14.86 34.675-44.582 34.675z"></path>
              </svg>
            </div>
            <div className="stat-title">Total Cryptos</div>
            <div className="stat-value">
              {millify(globalStats.total, { precision: 2 })}
            </div>
          </div>
        </div>

        <div className="shadow stats">
          <div className="stat bg-primary text-primary-content">
            <div class="stat-figure text-primary-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <div className="stat-title">Total Exchanges</div>
            <div className="stat-value">
              {millify(globalStats.totalExchanges)}
            </div>
          </div>
        </div>

        <div className="shadow stats">
          <div className="stat bg-primary text-primary-content">
            <div class="stat-figure text-primary-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="stat-title">Total Market Cap</div>
            <div className="stat-value">
              {millify(globalStats.totalMarketCap, { precision: 2 })}
            </div>
          </div>
        </div>

        <div className="shadow stats">
          <div className="stat bg-primary text-primary-content">
            <div class="stat-figure text-primary-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div className="stat-title">Total 24h Volume</div>
            <div className="stat-value">
              {millify(globalStats.total24hVolume, { precision: 1 })}
            </div>
          </div>
        </div>

        <div className="shadow stats">
          <div className="stat bg-primary text-primary-content">
            <div class="stat-figure text-primary-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </div>
            <div className="stat-title">Total Markets</div>
            <div className="stat-value">
              {millify(globalStats.totalMarkets, { precision: 2 })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between flex-col space-y-5 sm:space-y-0 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold">Top 10 Cryptocurrencies</h2>

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
