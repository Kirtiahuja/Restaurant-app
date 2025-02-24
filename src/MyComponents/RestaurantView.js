import React,{ useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RestaurantDetails from "./RestaurantDetails";

export default function RestaurantView({cart, setCart}){
    const [resDetail,setResDetail]=useState({});
    const {id} = useParams();
    useEffect(()=>{
        axios.get(`https://localhost:44326/api/Restaurant/${id}`)
    .then((result)=>{
        setResDetail(result.data);
    })
    .catch((error)=>
    console.log(error));
    },[]);
    return(
        <div className="container">
            <div className="display-4">{resDetail.restaurantName}</div>
            <div className="lead">
                {resDetail.type}<br/>
                {resDetail.address}
            </div>
            <div className="mt-4 text-uppercase blockquote">Menu</div>
            <div>
                <RestaurantDetails RestaurantId={id} cart={cart} setCart={setCart}/>
            </div>
        </div>
    );
};