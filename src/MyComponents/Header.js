import React,{ useState , useEffect } from "react";
import { Link } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
    
function onSearch(e){
        alert("You searched for "+ e); 
};

export default function Header(){
  
    const [openLogin,setOpenLogin]=useState(false);
    const [openRegister,setOpenRegister]=useState(false);
    const [search,setSearch]=useState("");

      useEffect(()=>{
    },[openLogin]);

    useEffect(()=>{
    },[openRegister]);

    return(
      <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-3 px-6">
        <Link className="navbar-brand" to="/">
        <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" className="h-6 w-auto"/>
        </Link>
        <form className="flex items-center border rounded-md shadow-sm overflow-hidden">
          <input type="search" value={search} className="px-4 py-2 text-gray-700 outline-none w-60 sm:w-72 lg:w-96" onChange={(e)=>{setSearch(e.target.value);}}/>
          <button type="submit" onClick={()=>onSearch(search)} className="px-3 py-2 text-white hover:bg-red-400 transition">
          <i className="bi bi-search text-gray-500"></i>
          </button>
        </form>
        <div className="flex items-center space-x-6">
          <Link className="text-gray-800 font-medium hover:text-red-400 transition" onClick={()=>setOpenLogin(true)}>Log In</Link>
          <Link className="text-gray-800 font-medium hover:text-red-400 transition" onClick={()=>setOpenRegister(true)}>Sign up</Link>
          <Link className="relative text-gray-800 font-medium hover:text-red-400 transition flex items-center" to="/cart">
              Cart <i className="bi bi-cart4 text-lg ml-2"></i>
          </Link>
        </div>
      </nav>
      </header>
        {openLogin && <Login onClose={()=>setOpenLogin(false)} Register={()=>setOpenRegister(true)}/>}
        {openRegister && <Register onClose={()=>setOpenRegister(false)} Login={()=>setOpenLogin(true)}/>}
      </>
    );
}