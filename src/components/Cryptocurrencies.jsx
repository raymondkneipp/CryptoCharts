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
          className="input input-bordered input-lg input-primary rounded-box"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
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
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Cryptocurrencies;
