import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "./context/context";
import App from "./App";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.localhost, chain.goerli, chain.polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Crowd Funding",
  chains,
});

const wagmiClient = createClient({
  connectors,
  provider,
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <Router>
        <AppProvider>
          <App />
        </AppProvider>
      </Router>
    </RainbowKitProvider>
  </WagmiConfig>
);
