import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import {
  Navbar,
  Exchanges,
  Homepage,
  Cryptocurrencies,
  News,
  CryptoDetails,
} from "./components";

const App = () => {
  return (
    <div className="grid grid-flow-row gap-10">
      <Navbar />

      <main className="container m-auto px-2">
        <div className="grid grid-flow-row gap-10">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/exchanges">
              <Exchanges />
            </Route>
            <Route exact path="/cryptocurrencies">
              <Cryptocurrencies />
            </Route>
            <Route exact path="/crypto/:coinId">
              <CryptoDetails />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
          </Switch>
        </div>
      </main>

      <footer className="p-10 footer bg-base-200 text-base-content footer-center">
        <div className="grid grid-flow-col gap-4">
          <Link className="link link-hover" to="/">
            Home
          </Link>
          <Link className="link link-hover" to="/cryptocurrencies">
            Cryptocurrencies
          </Link>
          <Link className="link link-hover" to="/exchanges">
            Exchanges
          </Link>
          <Link className="link link-hover" to="/news">
            News
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <p>Created with</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <p>
            by{" "}
            <a
              href="https://www.raymondkneipp.com/"
              className="link link-hover"
            >
              Raymond Kneipp
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
