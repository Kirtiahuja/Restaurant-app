import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RestaurantDetails from "./RestaurantDetails";

export default function RestaurantView({ cart, setCart }) {
  const [resDetail, setResDetail] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://localhost:44352/api/Restaurant/${id}`)
      .then((result) => {
        setResDetail(result.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div className="w-[80%] mx-auto p-6 pt-24">
      <h1 className="display-4">{resDetail.restaurantName}</h1>
      <p className="lead">{resDetail.type} <br />
        {resDetail.address}</p>
      <h2 className="mt-4 text-uppercase blockquote">Menu</h2>
      <div className="mt-4">
        <RestaurantDetails RestaurantId={id} cart={cart} setCart={setCart} />
      </div>
    </div>
  );
}
