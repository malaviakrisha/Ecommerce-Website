import React, {useState,useContext, useEffect} from 'react'
import './Shop.css'
import { StoreContext } from '../../context/StoreContext'
import CeramicItem from '../../components/CeramicItem/CeramicItem'

const Shop = () => {

  const {new_launch_list, search, showSearch} = useContext(StoreContext);
  const [sortOption, setSortOption] = useState("none");
  const [filterItems,setFilterItems] = useState([...new_launch_list]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedItems = [...filterItems].sort((a, b) => {
    switch (sortOption) {
      case 'priceHighToLow':
        return b.price - a.price;
      case 'priceLowToHigh':
        return a.price - b.price; 
      default:
        return 0;
    }
  });

  const applyFilter =() =>{
    let filterList = new_launch_list.slice();

    if(showSearch && search){
      filterList = filterList.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))
    }

    setFilterItems(filterList);
  }

  useEffect(()=>{
    applyFilter();
  },[search, showSearch])

  
  const totalCountShop = sortedItems.length;

  return (
    <div>
      <div className="shop-top">
        <h1>Shop ({totalCountShop})</h1>
      <select defaultValue="none" onChange={handleSortChange}> 
        <option value="none" hidden>Sort By</option>
        <option value="priceHighToLow">Sort By: Price High-to-Low</option>
        <option value="priceLowToHigh">Sort By: Price Low-to-High</option>
      </select>
      </div>
      <div className="shop-middle">
        <div className='ceramic-display-list'>
          {sortedItems.map((item,index)=>{
            return<CeramicItem key={index} id={item._id} name={item.name} price={item.price} showSalePrice={false} image={item.image} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Shop