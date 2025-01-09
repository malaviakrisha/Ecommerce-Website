import { createContext, useEffect, useState } from "react";
import { best_seller, popular_products,sale_list } from "../assets/assets";
import axios from "axios";

export const StoreContext= createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("");
    const [new_launch_list,setNewLaunchList] = useState([]);
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev)=>({...prev,[itemId]:1}))
        }
        else {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if (token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{Authorization: `Bearer ${token}`}})
        }
        }
    
    const removeFromCart = async (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{Authorization: `Bearer ${token}`}})
        }
    }

    const getTotalCartAmount=()=>{
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = new_launch_list.find((product)=>product._id === item);
                totalAmount += itemInfo.sale_list?itemInfo.new_price * cartItems[item]:itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchCeramicList = async()=>{
        const response = await axios.get(url+"/api/ceramic/list");
        setNewLaunchList(response.data.data);
    }

    const loadCartData = async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{Authorization: `Bearer ${token}`}})
        setCartItems(response.data.cartData);
    }

    useEffect(()=>{
        async function loadData() {
            await fetchCeramicList();
            const storedToken = localStorage.getItem("token");
            if (storedToken){
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    },[])

    const contextValue={
        new_launch_list,
        popular_products,
        best_seller,
        sale_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        search,
        setSearch,
        showSearch,
        setShowSearch
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider