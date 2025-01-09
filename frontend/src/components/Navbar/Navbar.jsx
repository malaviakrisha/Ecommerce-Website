import React, { useContext,useEffect, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link,NavLink, useNavigate, useLocation} from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import Product from '../../pages/Product/Product';

const Navbar = ({setShowLogin}) => {

    const navigate = useNavigate();
    const location = useLocation();
    const {setShowSearch} = useContext(StoreContext);

    const [visible,setVisible] = useState(false);

    const [menu, setMenu] = useState(() => {
        const path = location.pathname;
        if (path === '/') return 'Home';
        if (path === '/shop') return 'Shop';
        if (path === '/sale') return 'Sale';
        if (path === '/workshop') return 'Workshop';
        return 'Home'; 
    });

    useEffect(() => {
        const path = location.pathname;
        if (path === '/') setMenu('Home');
        else if (path === '/shop') setMenu('Shop');
        else if (path === '/sale') setMenu('Sale');
        else if (path === '/workshop') setMenu('Workshop');
    }, [location]);

    const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

    const logout=()=>{
      localStorage.removeItem("token");
      setToken("");
      navigate("/");
    }

  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className='logo'/></Link>
        <ul className="navbar-menu">
           <Link to='/'><li onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</li></Link> 
           <Link to='/shop'><li onClick={()=>setMenu("Shop")} className={menu==="Shop"?"active":""}>Shop</li></Link> 
           <Link to='/sale'><li onClick={()=>setMenu("Sale")} className={menu==="Sale"?"active":""}>Sale</li></Link> 
           <Link to='/workshop'><li onClick={()=>setMenu("Workshop")} className={menu==="Workshop"?"active":""}>Workshop</li></Link> 
        </ul>
        <div className="navbar-right">
            <Link to='/shop'><img onClick={()=>setShowSearch(true)} className='navbar-search' src={assets.search_icon} alt="" /></Link>
            <div className="navbar-search-icon">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {!token?<button onClick={()=>setShowLogin(true)}>Login</button>
            :<div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr/>
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>LogOut</p></li>
              </ul>
            </div>
            }
            <img onClick={()=>setVisible(true) } src={assets.menu_icon} className='nav-menu' alt=""/>
        </div>
        <div className={`nav-menu-items ${visible? 'visible': 'hidden'}`}>
          <div className='menu-cross'>
            <div onClick={()=>setVisible(false)} className='nav-menu-cross'>
              <img src={assets.cross_icon} className='nav-menu-cross-img' alt=""/>
              <p>Back</p>
            </div>
            <NavLink onClick={()=>setVisible(false)} className='menu-items' to='/'>HOME</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='menu-items' to='/shop'>SHOP</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='menu-items' to='/sale'>SALE</NavLink>
            <NavLink onClick={()=>setVisible(false)} className='menu-items' to='/workshop'>WORKSHOP</NavLink>
          </div>
        </div>
    </div>
  )
}

export default Navbar