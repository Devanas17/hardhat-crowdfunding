import { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import { contractAddress, contractABI } from "../utils/constant";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [contract, setContract] = useState();
  const { ethereum } = window;

  const ethereumClient = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        setContract(contract);
        return contract;
      }
    } catch (error) {
      console.log("Create Post Failed", error);
    }
  };

  useEffect(() => {
    ethereumClient();
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        alert("Make sure you have metamask!");
        return;
      } else {
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        const account = accounts[0];
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object.");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Make sure you have Metamask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      localStorage.setItem("isWalletConnected", true);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object found!");
    }
  };

  const createCampaign = async (form) => {
    try {
      if (ethereum) {
        console.log("Going to pop wallet now to pay gas...");
        const tx = await contract.createCampaign(
          form.title, // title
          form.description, // description
          new Date(form.deadline).getTime(), // deadline,
          form.target,
          form.image
        );
        await tx.wait();

      }
    } catch (error) {
      console.log("Create Campaign Failed", error);
    }
  };

  const getAllCampaigns = async () => {
    try {
      if (ethereum) {
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

        return parsedCampaings;
      }
    } catch (error) {
      console.log("Get Campaign Failed", error);
    }
  };

 
  const donate = async (pId, amount) => {
    const data = await contract.donateToCampaign(pId, {
      value: ethers.utils.parseEther(amount),
    });
    return data;
  };

  const getDonations = async (pId) => {
    const donations = await contract.getDonators(pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <AppContext.Provider
      value={{
        createCampaign,
        currentAccount,
        connectWallet,
        getAllCampaigns,
        contract,
        donate,
        getDonations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
