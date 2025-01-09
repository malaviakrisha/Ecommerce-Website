import React, { useContext, useState } from 'react';
import './Workshop.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const Workshop = () => {
  const [numPeople, setNumPeople] = useState(0);
  const totalCost = numPeople * 500;
  const { url, token } = useContext(StoreContext);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumPeople(isNaN(value) ? 0 : value);
  };

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    time_slot: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderData = {
      address: data,
      items: numPeople,
      amount: totalCost,
    };

      let response = await axios.post(url + '/api/workshop/place_workshop', orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        const { order_id, amount, razorpayKey } = response.data;

        // Load Razorpay's checkout script
        const loadScript = () => {
          return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => {
              resolve(true);
            };
            script.onerror = () => {
              resolve(false);
            };
            document.body.appendChild(script);
          });
        };

        const loaded = await loadScript();

        if (!loaded) {
          alert('Razorpay SDK failed to load. Are you online?');
          return;
        }

        // Configure Razorpay checkout options
        const options = {
          key: razorpayKey, // Razorpay key ID
          amount: amount, // in paise
          currency: 'INR',
          name: 'Workshop Registration',
          description: 'Register for the workshop',
          order_id: order_id, // from backend response
          handler: async function (response) {
            // Handle successful payment here
            const paymentData = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };

            let verifyResponse = await axios.post(url + '/api/workshop/verify_payment', paymentData, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (verifyResponse.data.success) {
              window.location.href = '/verify?success=true';
            } else {
              window.location.href = '/verify?success=false';
            }
          },
          prefill: {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            contact: data.phone,
          },
          notes: {
            address: data,
          },
          theme: {
            color: '#3399cc',
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        alert('Error occurred while placing order');
      }
    
  };

  return (
    <div>
      <div className="workshop-container">
        <div className="workshop-header">
          <h1>Register For Workshop:</h1>
          <br />
          <hr />
        </div>
        <div className="workshop-body">
          <form className="workshop-form" onSubmit={placeOrder}>
            <div className="workshop-details">
              <label>First Name:</label>
              <label>Last Name:</label>
            </div>
            <div className="workshop-details">
              <input name="firstName" onChange={onChangeHandler} type="text" placeholder="First Name" required />
              <input name="lastName" onChange={onChangeHandler} type="text" placeholder="Last Name" required />
            </div>
            <div className="workshop-details">
              <label>Email:</label>
              <label>Phone Number:</label>
            </div>
            <div className="workshop-details">
              <input onChange={onChangeHandler} name="email" type="email" placeholder="email address" required />
              <input onChange={onChangeHandler} name="phone" type="number" placeholder="Phone Number" required />
            </div>
            <label>Time Slot</label>
            <div className="time-slot workshop-details">
              <select name="time_slot" onChange={onChangeHandler} required>
                <option value="">Select a time slot</option>
                <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                <option value="12 Noon - 1:00 PM">12 Noon - 1:00 PM</option>
                <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                <option value="9:00 PM - 10:00 PM">9:00 PM - 10:00 PM</option>
              </select>
            </div>
            <div className="workshop-details">
              <b>Workshop Registration: </b>
              <b>Rs 500</b>
            </div>
            <div className="workshop-details">
              <p>Number of People</p>
              <input type="number" value={numPeople} onChange={handleInputChange} min="0" placeholder="Enter number of people" required />
            </div>
            <div className="workshop-details">
              <p>Total Price: </p>
              <b>Rs {totalCost}</b>
            </div>
            <button>Payment To Complete Registration</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Workshop;
