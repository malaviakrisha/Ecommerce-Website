import React, { useContext, useEffect, useState } from 'react'
import './Product.css'
import { Link, useParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import CeramicItem from '../../components/CeramicItem/CeramicItem'
import RelatedProducts from '../../components/RelatedProducts/RelatedProducts';

const Product = () => {

    const {productId} = useParams();
    const {new_launch_list} = useContext(StoreContext);
    const [productData,setProductData] = useState(false);
    const [image,setImage] = useState('')
    
    const fetchProductData = async()=>{

        new_launch_list.map((item)=>{
            if (item._id === productId) {
                setProductData(item)
                setImage(item.image[0])
                return null;
            }
        })
    }
    
    useEffect(()=>{
        fetchProductData();
    },[productId,new_launch_list])

  return productData ? (
    <div className='product'>
        <div className="product-data">
            <div className="product-image">
                <div className="product-image-multiple">
                    <CeramicItem id={productId} showSalePrice={false} price={productData.price} image={productData.image} />
                </div>
            </div>
            <div className="product-info">
                <h1>{productData.name}</h1>
                <h3>{productData.description}</h3>
                <h2>Rs {productData.price}</h2>
                <div className='product-info-desc'>
                    <h4>Customize Product:</h4>
                    <textarea type='text' name="description" rows="10" placeholder='Write content here' required/>
                </div>
                <Link to='/cart'><button type='submit'>Go To Cart</button></Link>
            </div>
        </div>

        <div className='related-products'>
            <RelatedProducts category={productData.category} subCategory={productData.subCategory}>
                <h2>Related Products</h2>
            </RelatedProducts>
        </div>
    </div>
  ) : <div className="prods"></div>
}

export default Product