import { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constant";
// import { useAddress, useMetamask } from '@thirdweb-dev/react';


export const AppContext = createContext(); 

export const AppProvider = ({ children }) => {
  // const address = useAddress();
  // const connect = useMetamask();

  const { ethereum } = window;
 
  const createCampaign = async (form) => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
     
        console.log("Going to pop wallet now to pay gas...");
        const tx = await contract.createCampaign(
            form.title, // title
            form.description, // description
            new Date(form.deadline).getTime(), // deadline,
            form.target,
            form.image
        );
        await tx.wait();

        console.log("contract call success", tx);
      }
    } catch (error) {
      console.log("Create Campaign Failed", error);
    }
  };

  const printHello = () => {
    console.log("printHello");
  };

  return (
    <AppContext.Provider
      value={{ createCampaign, printHello }}
    >
      {children}
    </AppContext.Provider>
  );
};
