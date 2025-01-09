import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {

  const [image,setImage]= useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    new_price:"",
    category:"Charms",
    best_seller: false,
    popular_products: false,
    sale_list: false
  })

  const onChangeHandler=(event)=>{
    const name = event.target.name;
    const value = event.target.type === 'checkbox'? event.target.checked : event.target.value;
    setData((data)=>({...data,[name]:value}))
  }

  const onSubmitHandler = async(event)=>{
    event.preventDefault();
    const formData= new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("new_price", data.sale_list? Number(data.new_price): 0)
    formData.append("category",data.category)
    formData.append("best_seller",data.best_seller)
    formData.append("popular_products",data.popular_products)
    formData.append("sale_list",data.sale_list)
    formData.append("image",image)
    
    const response = await axios.post(`${url}/api/ceramic/add`,formData);
    if (response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        new_price:"",
        category:"Charms",
        best_seller:false,
        popular_products:false,
        sale_list:false
      })
      setImage(false)
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Images</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt=""/>
          </label>
          <input onChange={(e)=> setImage(e.target.files[0])} type='file' id="image" hidden required/>
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} type='text' value={data.description} name="description" rows="6" placeholder='Write content here' required/>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Charms">Charms</option>
              <option value="Holders">Holders</option>
              <option value="Bracelets">Bracelets</option>
              <option value="Fridge Magnets">Fridge Magnets</option>
              <option value="Rings">Rings</option>
              <option value="Necklaces">Necklaces</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='Rs 49'/>
          </div>
        </div>
        <div className='best_seller flex_col'>
          <label>
            <input type='checkbox' name='best_seller' checked={data.best_seller} onChange={onChangeHandler}/>
            Mark as Best Seller
          </label>
        </div><div className='best_seller flex_col'>
          <label>
            <input type='checkbox' name='popular_products' checked={data.popular_products} onChange={onChangeHandler}/>
            Mark as Newly Launched
          </label>
        </div><div className='best_seller flex_col'>
          <label>
            <input type='checkbox' name='sale_list' checked={data.sale_list} onChange={onChangeHandler}/>
            On Sale!
          </label>
        </div>
        {data.sale_list && (
          <div className="add-new-price flex-col">
            <p>Sale Price</p>
            <input onChange={onChangeHandler} value={data.new_price} type='number' name='new_price' placeholder='Sale Price Rs 39'/>
          </div>
        )}
        <button type='submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add