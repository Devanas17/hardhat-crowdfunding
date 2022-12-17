import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/context";
import { DisplayCampaign } from "../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { currentAccount, getUserCampaign, crContract } = useContext(AppContext);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaign();
    console.log("The data is",data)
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (crContract) fetchCampaigns();
  }, [currentAccount, crContract]);
  useEffect(() => {
     fetchCampaigns();
  }, []);

  return (
    <div className="text-white">
      <DisplayCampaign
      key={campaigns?.id}
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
};

export default Home;
