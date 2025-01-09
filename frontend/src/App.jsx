import React from 'react'
import { useState } from 'react';
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Shop from './pages/Shop/Shop';
import Sale from './pages/Sale/Sale';
import Workshop from './pages/Workshop/Workshop';
import Product from './pages/Product/Product';
import Verify from './pages/Verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
import SearchBar from './components/SearchBar/SearchBar';

const App = () => {

  const [showLogin,setShowLogin] = useState(false) 

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <SearchBar/>
        <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/order' element={<PlaceOrder/>} />
            <Route path='/shop' element={<Shop/>} />
            <Route path='/sale' element={<Sale/>}/>
            <Route path='/workshop' element={<Workshop/>}/>
            <Route path='/shop/:productId' element={<Product/>}/>
            <Route path='/verify' element={<Verify/>}/>
            <Route path='/myorders' element={<MyOrders/>}/>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App