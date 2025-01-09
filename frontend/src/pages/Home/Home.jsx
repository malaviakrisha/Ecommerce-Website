import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import CeramicDisplay from '../../components/CeramicDisplay/CeramicDisplay'

const Home = () => {

  const [category,setCategory] = useState("All");
  return (
    <div>
      <Header/>
      <CeramicDisplay category={category} />
    </div>
  )
}

export default Home