import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom';
import{
    FaFacebookSquare,
    FaGithubSquare,
    FaInstagramSquare,
    FaTwitterSquare
} from 'react-icons/fa'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-head-container'>
            <h1>QUIRKLAY</h1>
            <p>Unlock Your Future: Discover, Compare, and Track Scholarships with Personalized Filters and Success Rate Estimates!</p>
            <div className='footer-head-container-icons'>
                <FaFacebookSquare size={30}/>
                <FaGithubSquare size={30}/>
                <FaInstagramSquare size={30}/>
                <FaTwitterSquare size={30}/>
            </div>
        </div>
        <div className='footer-list-container'>
            <div className='footer-list-container-one'>
                <h3 >Company</h3>
                <ul >
                    <a href="#top"><li >Home</li></a>
                    <Link to='/myorders'><li >Delivery</li></Link>
                    <li >Privacy Policy</li>
                </ul>
            </div>
            <div className='footer-list-container-two'>
                <h3 >Get In Touch</h3>
                <ul >
                    <li >12345 67890</li>
                    <li >quirklay@gmail.com</li>
                </ul>
            </div>
            <div className='footer-list-container-three'>
                <h3 >Quick Links</h3>
                <ul >
                    <Link to='/shop'><li >Shop</li></Link>
                    <Link to='/sale'><li >Sale</li></Link>
                    <Link to='/workshop'><li >Workshop</li></Link>
                    <Link to='/cart'><li >Cart</li></Link>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer