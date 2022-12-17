import React, {useState, useEffect, useContext} from 'react'
import {AppContext} from "../context/context"
import {logo} from "../assets/index"
import CustomButton from './CustomButton'

const Login = () => {
    const {currentAccount, connectWallet} = useContext(AppContext)
  return (
    <div className='h-screen overflow-hidden text-white flex items-center justify-center '>
      <div className=" ">
        <div>
          <CustomButton 
          btnType="button"
          title="Login with Metamask"
          handleClick={() =>connectWallet()}
          styles=" bg-[#8c6dfd]"
          />
        </div>
      </div>
  </div>
  )
}

export default Login