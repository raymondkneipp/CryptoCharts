import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";

import { Loader } from ".";

import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <input
          type="text"
          placeholder="Search Cryptocurrency"
          className="input input-bordered input-lg rounded-box"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {cryptos?.map((currency) => (
          <Link
            className="flex"
            to={`/crypto/${currency.id}`}
            key={currency.id}
          >
            <div className="card shadow-xl image-full flex-1">
              <figure>
                <img src={currency.iconUrl} alt={currency.name} />
              </figure>
              <div className="justify-end card-body">
                <h2 className="card-title">{`${currency.rank}. ${currency.name}`}</h2>
                <div className="flex flex-row items-center justify-between">
                  <p>$ {millify(currency.price, { precision: 3 })}</p>
                  <p
                    className={`flex items-center ${
                      currency.change >= 0 ? "text-success" : "text-error"
                    }`}
                  >
                    {currency.change >= 0 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                        />
                      </svg>
                    )}{" "}
                    {millify(currency.change, { precision: 1 })}%
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Cryptocurrencies;
