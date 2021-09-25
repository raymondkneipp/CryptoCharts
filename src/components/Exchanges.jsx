import React from "react";
import millify from "millify";
import HTMLReactParser from "html-react-parser";

import { Loader } from ".";

import { useGetExchangesQuery } from "../services/cryptoApi";

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Exchange</th>
            <th>24h Trade Volume</th>
            <th>Markets</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {exchangesList.map((exchange) => (
            <tr key={exchange.id}>
              <td>
                <a href={`/exchanges#${exchange.id}`}>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="w-12 h-12 mask mask-squircle">
                        <img src={exchange.iconUrl} alt={exchange.name} />
                      </div>
                    </div>

                    <div className="font-bold">
                      {exchange.rank}. {exchange.name}
                    </div>
                  </div>
                </a>

                <div id={exchange.id} className="modal">
                  <div className="modal-box space-y-5 overflow-scroll max-h-screen flex flex-col">
                    <div className="flex items-center space-x-2">
                      <div className="avatar">
                        <div className="w-12 h-12 mask mask-squircle">
                          <img src={exchange.iconUrl} alt={exchange.name} />
                        </div>
                      </div>

                      <div className="font-bold">
                        {exchange.rank}. {exchange.name}
                      </div>
                    </div>

                    <div className="stat bg-base-200 rounded-box">
                      <div className="stat-title">24h Trade Volume</div>
                      <div className="stat-value">
                        ${millify(exchange.volume)}
                      </div>
                    </div>
                    <div className="stat bg-base-200 rounded-box">
                      <div className="stat-title">Markets</div>
                      <div className="stat-value">
                        {millify(exchange.numberOfMarkets)}
                      </div>
                    </div>
                    <div className="stat bg-base-200 rounded-box">
                      <div className="stat-title">Change</div>
                      <div className="stat-value">
                        {millify(exchange.marketShare)}%
                      </div>
                    </div>
                    <div className="whitespace-normal space-y-5">
                      {HTMLReactParser(exchange.description || "")}
                    </div>
                    <div className="modal-action">
                      <a href="/exchanges" className="btn">
                        Close
                      </a>
                    </div>
                  </div>
                </div>
              </td>
              <td>${millify(exchange.volume)}</td>
              <td>{millify(exchange.numberOfMarkets)}</td>
              <th>{millify(exchange.marketShare)}%</th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Exchange</th>
            <th>24h Trade Volume</th>
            <th>Markets</th>
            <th>Change</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Exchanges;
