import React from "react";
import { useNavigate } from "react-router-dom";

export default function Restaurant(props){
    var stars=[];
    var rating=props.restaurant.rating;
    for(let i=5;i>0;i--){
        if(rating>0){
            stars.push(<i className="fa-solid fa-star" style={{color:"#f1f50f"}}></i>);
        }
        else{
            stars.push(<i className="fa-regular fa-star" style={{color:"#f1f50f"}}></i>);
        }
        rating--;
    }

    const navigate = useNavigate();

    return(
        <>
            <div className="col-lg-3 pt-1">
                    <div className="box-shadow">
                        <div className="card" onClick={() => navigate(`/restaurant/${props.restaurant.restaurantID}`)}>
                            <img className="img-fluid card-img-top" style={{height:"200px", width:"300px"}} src={props.restaurant.imageUrl} alt=""/>
                            {/* <div className="card-body"> */}
                                <h5 className="card-title">{props.restaurant.restaurantName}</h5>
                                <p className="card-text">
                                    <span className="ms-2">{props.restaurant.type}</span>
                                </p>
                                    <span>
                                        {stars}
                                    </span>
                            </div>
                        </div>
                    </div>
        </>
    )
}