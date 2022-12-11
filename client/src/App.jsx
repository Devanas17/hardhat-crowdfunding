import { useState } from 'react'
import {Sidebar, Navbar} from "./components"
import {Home, Profile, CreateCampaign, CampaignDetails} from "./pages/index"
import {Route, Routes} from "react-router-dom"

function App() {

  return (
    <div className="relative max-w-[1400px] mx-auto sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
       <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
