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
            <th className="hidden sm:table-cell">24h Trade Volume</th>
            <th className="hidden md:table-cell">Markets</th>
            <th className="hidden lg:table-cell">Change</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {exchangesList.map((exchange) => (
            <tr key={exchange.id}>
              <td>
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
              </td>
              <td className="hidden sm:table-cell">
                $ {millify(exchange.volume)}
              </td>
              <td className="hidden md:table-cell">
                {millify(exchange.numberOfMarkets)}
              </td>
              <th className="hidden lg:table-cell">
                {millify(exchange.marketShare)}%
              </th>
              <th>
                <label
                  htmlFor={exchange.id}
                  className="btn btn-ghost btn-square"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </label>

                <input
                  type="checkbox"
                  id={exchange.id}
                  className="modal-toggle"
                  onChange={(e) => {
                    if (e.target.checked) {
                      document.body.style.position = "fixed";
                      document.body.style.left = 0;
                      document.body.style.right = 0;
                    } else {
                      document.body.style.position = "static";
                    }
                  }}
                />

                <div className="modal">
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
                        $ {millify(exchange.volume)}
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
                      <label htmlFor={exchange.id} className="btn btn-primary">
                        Close
                      </label>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Exchange</th>
            <th className="hidden sm:table-cell">24h Trade Volume</th>
            <th className="hidden md:table-cell">Markets</th>
            <th className="hidden lg:table-cell">Change</th>
            <th>Details</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Exchanges;
