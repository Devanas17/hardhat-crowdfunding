import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { AppProvider } from "./context/context";
import { BrowserRouter as Router } from 'react-router-dom';


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

ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiConfig client={wagmiClient}>
    <Router>
    <AppProvider>
    <RainbowKitProvider chains={chains}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
    </RainbowKitProvider>
    </AppProvider>
    </Router>
  </WagmiConfig>
);
