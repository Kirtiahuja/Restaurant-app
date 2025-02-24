import React, { useState,useEffect } from "react";
import axios from "axios";
import Restaurant from "./Restaurant";
import './MainPage.css'

export default function MainPage(){
    const [restaurants,setRestaurants]=useState([]);

    useEffect(()=>{
        axios.get(`https://localhost:44326/api/Restaurant`)
    .then((result)=>{
        setRestaurants(result.data);
    })
    .catch((error)=>
    console.log(error));
    },[]);
  
    return(
        
        <div className="container my-3">
            <h3 className="my-3 text-center">Recommended for You</h3>
            <div className="col-12">
            <div className="row mt-3">
            {restaurants.length===0?<p>Loading...</p>:
            restaurants.map((restaurant,index)=>{
                return <Restaurant restaurant={restaurant} key={restaurant.RestaurantID || index}/>
            })}
            </div>
            </div>
        </div>
    );
}