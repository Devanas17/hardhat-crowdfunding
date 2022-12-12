import { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constant";
import { useAccount } from "wagmi";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const address = useAccount();
  const [crContract, setCrContract] = useState()

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
        setCrContract(contract)

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

  const getAllCampaigns = async () => {
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
        const campaigns = await contract.getCampaigns();

        const parsedCampaings = campaigns.map((campaign, i) => ({
          creator: campaign.creator,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(
            campaign.amountCollected.toString()
          ),
          image: campaign.image,
          pId: i,
        }));

        console.log("contract call success");
        return parsedCampaings;

      }
    } catch (error) {
      console.log("Get Campaign Failed", error);
    }
  };

  return (
    <AppContext.Provider value={{ createCampaign, address, getAllCampaigns, crContract }}>
      {children}
    </AppContext.Provider>
  );
};
