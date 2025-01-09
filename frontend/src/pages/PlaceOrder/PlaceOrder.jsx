import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const { getTotalCartAmount, token, new_launch_list, cartItems, url } = useContext(StoreContext);

  const cartItemsArray = Object.entries(cartItems);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
    cust_desc: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    new_launch_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+10,
    }

     
      console.log("orderdata",orderData)
      console.log("token",token)
      const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { Authorization: `Bearer ${token}` } });
      console.log("response",response.data)

      if (response.data.success) {
        const { userId,order_id, amount, currency, razorpayKey } = response.data;  

        const options = {
          key: razorpayKey,  
          amount: amount,  
          currency: currency, 
          name: "Quirklay",  
          description: "Order Payment",
          order_id: order_id,  
          handler: async function (response) {
            const paymentData = {
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
              userId:userId
            };
            
            let verifyResponse = await axios.post(`${url}/api/order/verify`, paymentData, { headers: {Authorization: `Bearer ${token}`} });
            
            if (verifyResponse.data.success) {
              alert("Payment successful");
            
              window.location.replace(`http://localhost:5173/verify?success=true&orderId=${verifyResponse.data.order_id}`);
            } else {
              alert("Payment failed");
            }
          },
          prefill: {
            name: data.firstName + " " + data.lastName,
            email: data.email,
            contact: data.phone,
          },
          theme: {
            color: "#3399cc",
          },
        };
        console.log(options,"options")

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      } else {
        alert("Error placing order");
      }
    
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' required />
          <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' required />
        </div>
        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' required />
        <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' required />
        <div className="multi-fields">
          <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required />
          <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required />
        </div>
        <div className="multi-fields">
          <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' required />
          <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required />
        </div>
        <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required />
        <textarea type="text" onChange={onChangeHandler} value={data.cust_desc} name='cust_desc' rows="10" placeholder='Customized Product ' required />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>Rs {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fees</p>
              <p>Rs {getTotalCartAmount() === 0 ? 0 : 10}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>Rs {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 10}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT </button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;
