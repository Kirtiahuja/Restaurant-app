import React from "react";
import { useNavigate } from "react-router-dom";

export default function Restaurant({ restaurant }) {
  const navigate = useNavigate();
  const stars = [];

  for (let i = 0; i < 5; i++) {
    stars.push(
      <i
        key={i}
        className={`fa-${i < restaurant.rating ? "solid" : "regular"} fa-star text-yellow-400`}
      ></i>
    );
  }

  return (
    <div className="cursor-pointer">
      <div
        className="bg-white shadow-md rounded-lg overflow-hidden border"
        onClick={() => navigate(`/restaurant/${restaurant.restaurantId}`)}
      >
        <img
          className="w-full h-48 object-cover"
          src={restaurant.imageUrl}
          alt={restaurant.restaurantName}
        />
        <div className="p-4">
          <h5 className="text-lg font-bold text-black">{restaurant.restaurantName}</h5>
          <p className="text-sm text-gray-600">{restaurant.type}</p>
          <div className="mt-2 flex items-center">
            {stars}
            <span className="ml-2 text-gray-600 font-light">{restaurant.rating}.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
