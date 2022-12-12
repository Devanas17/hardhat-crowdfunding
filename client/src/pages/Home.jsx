import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/context";
import { DisplayCampaign } from "../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const { address, getAllCampaigns, crContract } = useContext(AppContext);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getAllCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (crContract) fetchCampaigns();
  }, [address, crContract]);

  return (
    <div className="text-white">
      <DisplayCampaign
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
};

export default Home;
