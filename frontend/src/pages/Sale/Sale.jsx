import React, {useContext, useEffect, useState} from 'react'
import './Sale.css'
import { StoreContext } from '../../context/StoreContext'
import CeramicItem from '../../components/CeramicItem/CeramicItem'

const Sale = () => {

  const {new_launch_list} = useContext(StoreContext);
  const [saleSeller,setSaleSeller] = useState([]);
  const [sortOption, setSortOption] = useState("none");

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedItems = [...saleSeller].sort((a, b) => {
    switch (sortOption) {
      case 'priceHighToLow':
        return b.price - a.price;
      case 'priceLowToHigh':
        return a.price - b.price; 
      default:
        return 0;
    }
  });

  
  const totalCountSale = sortedItems.length;

  useEffect(()=>{
    
    const saleProduct = new_launch_list.filter((item)=>(item.sale_list));
    setSaleSeller(saleProduct.slice(0,6))

  },[new_launch_list])

  return (
    <div>
      <div className="sale-top">
        <h1>Sale ({totalCountSale})</h1>
      <select defaultValue="none" onChange={handleSortChange}> 
        <option value="none" hidden>Sort By</option>
        <option value="priceHighToLow">Sort By: Price High-to-Low</option>
        <option value="priceLowToHigh">Sort By: Price Low-to-High</option>
      </select>
      </div>
      <div className="sale-middle">
        <div className='ceramic-display-list'>
          {saleSeller.map((item,index)=>{
            return<CeramicItem key={index} id={item._id} name={item.name} price={item.price} new_price={item.new_price} showSalePrice={true} image={item.image} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Sale