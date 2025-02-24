import React,{useState} from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

function onSearch(e){
        alert("You searched for "+ e); 
};

export default function Header(){
    const [search,setSearch]=useState("");
    return(
      <header>
      <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <div className="container justify-content-center align-items-center">
        <Link className="navbar-brand" href="#">
        <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png" tabIndex={"0"} height={'25px'} width={'120px'}/>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex input-group w-auto">
            <input type="search" value={search} className="form-control" placeholder="Type query" aria-label="Search" onChange={(e)=>{setSearch(e.target.value);}}/>
            <button type="submit" onClick={()=>onSearch(search)}>
            <i className="bi bi-search"></i>
            </button>
          </form>
          <div className="d-flex align-items-center ms-auto">
            <Link className="nav-link d-flex align-items-center text-dark" to="/cart">
                Cart <i className="bi bi-cart4 ms-2" style={{ fontSize: "1.2rem" }}></i>
            </Link>
          </div>
          </div>
        </div>
      </nav>
      </header>
    );
}