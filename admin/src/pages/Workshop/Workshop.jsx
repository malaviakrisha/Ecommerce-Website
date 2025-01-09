import React from 'react'
import './Workshop.css'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const Workshop = ({url}) => {

  const [workshop_reg_list,setWorkshop_Reg_List] = useState([]);

  const fetchAllRegistrations = async()=>{
    const registers_response = await axios.get(url+'/api/workshop/workshop_list') 
    if (registers_response.data.success) {
      setWorkshop_Reg_List(registers_response.data.data);
    }
    else{
      toast.error("Error");
    }
  }

  useEffect(()=>{
    fetchAllRegistrations();
  },[])


  return (
    <div className='workshop add'>
      <h3>Workshop Registration</h3>
      <div className="workshop-list">
        {workshop_reg_list.map((details,index)=>{
          return(
          <div key={index} className="workshop-details">
              <p className="registrations-name">
                <b>Name: </b>
                {details.address.firstName+" "+ details.address.lastName}
              </p>
              <div className="registrations-address">
                <p><b>Time Slot:</b> {details.address.time_slot}</p>
              </div>
              <div className="registrations-address">
                <p><b>Phone: </b> {details.address.phone}</p>
                <p><b>Email: </b> {details.address.email}</p>
              </div>
              <div className="registration-people">
                <p><b>People:</b> {details.items}</p>
                <p><b>Amount Paid:</b> {details.amount}</p>
              </div>
          </div>)
        })}
      </div>
    </div>
  )
}

export default Workshop