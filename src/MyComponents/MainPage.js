import React, { useState, useEffect } from "react";
import axios from "axios";
import Restaurant from "./Restaurant";

export default function MainPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:44352/api/Restaurant`)
      .then((result) => {
        setRestaurants(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 pt-24">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Recommended for You
      </h3>

      {restaurants.length === 0 ? (
        <p className="text-center text-gray-500 text-lg animate-pulse">
          Loading...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant, index) => (
            <Restaurant restaurant={restaurant} key={restaurant.RestaurantId} />
          ))}
        </div>
      )}
    </div>
  );
}
