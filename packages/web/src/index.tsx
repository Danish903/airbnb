import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { client } from "./apollo";
import { Routes } from "./routes";

const jsx = (
   <ApolloProvider client={client}>
      <Routes />
   </ApolloProvider>
);
const rootEl = document.getElementById("root");
ReactDOM.render(jsx, rootEl);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
