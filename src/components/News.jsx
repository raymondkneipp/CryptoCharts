import React, { useState } from "react";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

import { Loader } from ".";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const count = simplified ? 6 : 12;
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });
  const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loader />;

  return (
    <>
      {!simplified && (
        <>
          <select
            className="select select-bordered w-full select-lg"
            onChange={(e) => setNewsCategory(e.target.value)}
            value={newsCategory}
          >
            <option value="Cryptocurrency">Cryptocurrency</option>
            {data?.data?.coins.map((coin) => (
              <option value={coin.name} key={coin.name}>
                {coin.name}
              </option>
            ))}
          </select>
        </>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {cryptoNews.value.map((news, i) => (
          <a
            className="flex"
            href={news.url}
            target="_blank"
            rel="noreferrer"
            key={i}
          >
            <div className="card shadow-xl image-full flex-1">
              <figure>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </figure>
              <div className="justify-between card-body">
                <div>
                  <h2 className="card-title">{news.name}</h2>
                  <p>
                    {news.description.length > 100
                      ? `${news.description.substring(0, 100)}...`
                      : news.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt="source"
                      className="w-10 h-10 rounded-box"
                    />
                    <h6 className="text-sm font-bold">
                      {news.provider[0]?.name}
                    </h6>
                  </div>
                  <h5 className="text-base">
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </h5>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default News;
