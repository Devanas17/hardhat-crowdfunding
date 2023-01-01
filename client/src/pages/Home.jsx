import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/context";
import { DisplayCampaign } from "../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const {  getAllCampaigns } = useContext(AppContext);

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getAllCampaigns();
    console.log(data)
    setCampaigns(data);
    setIsLoading(false);
  };

 
  useEffect(() => {
     fetchCampaigns();
  }, []);


  return (
    <div className="text-white">
      <DisplayCampaign
        key={campaigns}
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </div>
  );
};

export default Home;
