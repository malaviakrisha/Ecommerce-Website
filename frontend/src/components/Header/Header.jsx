import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='header'>
      <img src='/header_img.jpg' alt="" className="header_img" />
      <div className="header-contents">   
        <h2>QUIRKLAY</h2>
        <p>Everything Handmade With Love And Care </p>
        <Link to='/shop'><button>Shop Now</button></Link>
      </div>
    </div>
  )
}

export default Header