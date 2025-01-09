import React, { useContext, useEffect, useState } from 'react'
import './SearchBar.css'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets';
import {useLocation} from 'react-router-dom'

const SearchBar = () => {

    const {search, setSearch, showSearch, setShowSearch} = useContext(StoreContext);
    const location= useLocation();
    const [visible,setVisible] = useState(false);

    useEffect(()=>{
        if (location.pathname.includes('shop')) {
            setVisible(true);
        }
        else{
            setVisible(false);
        }
    },[location])

  return showSearch && visible ? (
    <div className='search-bar'>
        <div className="search-bar-loc">
            <img src={assets.search_icon} className='search-bar-icon' alt="" />
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='search-bar-input' type='text' placeholder='Search'/>
        </div>
        <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} alt="" className='search-bar-cross'/>
    </div>
  ):null
}

export default SearchBar