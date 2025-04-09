import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RestaurantDetails({ RestaurantId, cart, setCart }) {
  const [menu, setRestaurantMenu] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:44352/api/Restaurant/${RestaurantId}/menu`)
      .then((result) => {
        setRestaurantMenu(result.data);
      })
      .catch((error) => console.log(error));
  }, [RestaurantId]);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const addToCart = (product, qtyChange) => {
    setCart((prevCart) => {
      if (qtyChange > 0) {
        const itemExists = prevCart.find((item) => item.itemID === product.itemID);
        if (itemExists) {
          return prevCart.map((item) =>
            item.itemID === product.itemID ? { ...item, qty: item.qty + qtyChange } : item
          );
        }
        return [...prevCart, { ...product, qty: 1 }];
      } else {
        return prevCart
          .map((item) =>
            item.itemID === product.itemID ? { ...item, qty: item.qty + qtyChange } : item
          )
          .filter((item) => item.qty > 0);
      }
    });
  };

  return (
    <div className="mx-auto">
      {menu.map((item) => {
        const cartItem = cart.find((cartItem) => cartItem.itemID === item.itemID);
        const quantity = cartItem ? cartItem.qty : 0;

        return (
          <div key={item.itemID} className="bg-white rounded-xl shadow-md p-4 mb-4 flex items-center justify-between">
            <div className="flex flex-col">
              <h6 className="text-lg font-semibold text-gray-800">{item.itemName}</h6>
              <p className="text-green-600 font-medium text-sm">Rs. {item.itemPrice}/-</p>
              <p className="text-gray-500 text-sm">{item.itemDescription}</p>
            </div>
            <div className="flex flex-col items-center w-1/3">
              <img src={item.imageUrl} alt={item.itemName} className="w-20 h-20 object-cover rounded-lg shadow"/>

              <div className="mt-2 flex items-center">
                {quantity === 0 ? (
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                    onClick={() => addToCart(item, 1)}>
                    Add
                  </button>
                ) : (
                  <div className="flex items-center space-x-2 bg-red-500 text-white px-3 py-2 rounded-lg">
                    <button className="px-2" onClick={() => addToCart(item, -1)}>-</button>
                    <span>{quantity}</span>
                    <button className="px-2" onClick={() => addToCart(item, 1)}>+</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
