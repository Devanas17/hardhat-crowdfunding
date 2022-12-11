import React, {useContext} from 'react'
import { AppContext } from '../context/context'
const Home = () => {
  const {createCampaign, printHello} = useContext(AppContext);
  const name = 'h';
  const title = "Hello"
  const description = "My first campaign"
  const image = "https://images.pexels.com/photos/11719056/pexels-photo-11719056.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
  const target = "3"
  const deadline = "17-12-22"; 

  

  return (
    <div>Home
      <button className='bg-red-400' onClick={() => createCampaign(title, description,deadline, target, image)}>Create</button>
      {/* <button className='bg-red-400' onClick={() => createCampaign()}>Create</button> */}
      <button className='bg-red-400' onClick={() => printHello()}>Print</button>
    </div>
  )
}

export default Home