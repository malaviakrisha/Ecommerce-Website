import React from 'react'
import { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'


const Cart = () => {

  const {cartItems,new_launch_list,removeFromCart,getTotalCartAmount,url} = useContext(StoreContext); 
  const navigate= useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {new_launch_list.map((item,index)=>{
          if(cartItems[item._id]>0)
          {
            return(
              <div key={index} className="cart-items-title cart-items-item">
                <img src={url+"/images/"+item.image} alt=""/>
                <p>{item.name}</p>
                <p>Rs {item.sale_list?item.new_price:item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>Rs {item.sale_list?item.new_price * cartItems[item._id]:item.price * cartItems[item._id]}</p>
                <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs {getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delviery Fees</p>
              <p>Rs {getTotalCartAmount()===0?0:10}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs {getTotalCartAmount()===0?0:getTotalCartAmount()+10}</b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Cart