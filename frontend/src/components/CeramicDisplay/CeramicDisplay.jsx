import React, { useContext, useEffect, useState } from 'react'
import './CeramicDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import CeramicItem from '../CeramicItem/CeramicItem'

const CeramicDisplay = ({category}) => {
  
  const {new_launch_list} = useContext(StoreContext);
  const [bestSeller,setBestSeller] = useState([]);
  const [popularSeller,setPopularSeller] = useState([]);

  useEffect(()=>{
    const bestProduct = new_launch_list.filter((item)=>(item.best_seller));
    setBestSeller(bestProduct.slice(0,6))

    const popularProduct = new_launch_list.filter((item)=>(item.popular_products));
    setPopularSeller(popularProduct.slice(0,6))

  },[new_launch_list])

  return (
    <div className='ceramic-display' id='ceramic-display'>
        <h1>Newly Launched</h1>
          <div className='ceramic-display-list'>
            {popularSeller.map((item,index)=>{
              return<CeramicItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
            })}
          </div>
        
        <h1>Best Seller</h1>
        <div className='ceramic-display-list'>
          {bestSeller.map((item,index)=>{
            return <CeramicItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
          })}
        </div>
    </div>
  )
}

export default CeramicDisplay