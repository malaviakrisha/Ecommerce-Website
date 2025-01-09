import React, { useContext } from 'react'
import './CeramicItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import {Link} from 'react-router-dom'

const CeramicItem = ({id,name,price,description,image,new_price,showSalePrice}) => {

  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  const handleAddToCart = (e,id)=>{
    e.preventDefault()
    addToCart(id);
  }

  const handleRemoveFromCart = (e,id)=>{
    e.preventDefault()
    removeFromCart(id);
  }

  return (
    <Link to={`/shop/${id}`}>
      <div className='ceramic-item'>
          <div className="ceramic-item-img-container">
            <img className='ceramic-item-image' src={url+"/images/"+image} alt="" />
              {!cartItems[id]
                ? <img src={assets.add_icon_white} onClick={(e)=> handleAddToCart(e,id)} alt="" className="add" />
                : <div className="ceramic-item-counter">
                    <img onClick={(e)=> handleRemoveFromCart(e,id)} src={assets.remove_icon_red} alt="" />
                    <p>{cartItems[id]}</p>
                    <img onClick={(e)=> handleAddToCart(e,id)} src={assets.add_icon_green} alt=""/>
                </div>
              }
          </div>
          <div className="ceramic-item-info">
              <div className="ceramic-item-name-rating">
                  <p>{name}</p>
                  <img src={assets.rating_starts} alt="" />
              </div>
              <p className="ceramic-item-desc">{description}</p>
              <div className='ceramic-item-cost'>
              <p className="ceramic-item-price">Rs {price}</p>
              { showSalePrice && new_price && (
                <p className="ceramic-item-newprice">Rs {new_price}</p>
              )}
              </div>
          </div>
      </div>
    </Link>
  )
}

export default CeramicItem