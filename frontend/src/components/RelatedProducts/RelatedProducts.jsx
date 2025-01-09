import React, { useContext, useEffect, useState } from 'react'
import './RelatedProducts.css'
import { StoreContext } from '../../context/StoreContext'
import CeramicItem from '../CeramicItem/CeramicItem'

const RelatedProducts = ({category,subCategory}) => {

    const {new_launch_list} = useContext(StoreContext)
    const [related,setRelated] = useState([]);

    useEffect(()=>{
        if(new_launch_list.length>0){
            let productsCopy = new_launch_list.slice();

            productsCopy= productsCopy.filter((item)=> category === item.category);
            productsCopy = productsCopy.filter((item)=> subCategory ===item.subCategory);

            setRelated(productsCopy.slice(0,5));
        }
        
    },[new_launch_list])
  return (
        <div className='related-products'>
            <div className='related-products-details'>
                <h2>Related Products---</h2>
            </div>
            <div className='related-productd-components'>
                {related.map((item,index)=>(
                    <CeramicItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image}/>
                ))}
            </div>
        </div>
  )
}

export default RelatedProducts