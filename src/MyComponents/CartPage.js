import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const [itemTotal, setItemTotal] = useState(0.0);
  const DeliveryFee = 30;
  const PlatformFee = 6;
  const [GST, setGST] = useState(0.0);
  const [ToPay, setToPay] = useState(0.0);

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.itemPrice * item.qty, 0);
    setItemTotal(total);
  }, [cart]);

  useEffect(() => {
    const gstValue = (5 / 100) * itemTotal;
    setGST(gstValue.toFixed(2));
    setToPay(itemTotal + DeliveryFee + PlatformFee + gstValue);
  }, [itemTotal]);

  const cartChange = (product, qtyChange) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.itemID === product.itemID ? { ...item, qty: item.qty + qtyChange } : item
        )
        .filter((item) => item.qty > 0) // Remove items with qty <= 0
    );
  };

  return (
    <div className="mt-10 pt-24">
      {cart.length === 0 ? (
        <div className="w-[80%] mx-auto text-center p-6">
          <p className="mt-10 blockquote">Your cart is empty</p>
          <Link to="/">
            <button className="mt-2 px-6 py-3 bg-red-500 text-white rounded-md text-lg font-medium hover:bg-red-600 transition">
              See Restaurants Near You
            </button>
          </Link>
        </div>
      ) : (
        <div className="w-[80%] mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-center display-4 text-3xl font-medium mb-4">Cart Items</h3>

          {cart.map((cartItem) => (
            <div className="flex justify-between items-center border-b py-4" key={cartItem.itemID}>
              <div className="flex-1">
                <h6 className="text-lg font-semibold">{cartItem.itemName}</h6>
                <p className="text-green-600 text-sm">Rs. {cartItem.itemPrice}/-</p>
                <p className="text-gray-500 text-sm">{cartItem.itemDescription}</p>
              </div>

              <div className="flex items-center space-x-2 bg-red-500 text-white rounded-lg">
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded-md"
                  onClick={() => cartChange(cartItem, -1)}>
                  -
                </button>
                <span className="text-lg font-medium">{cartItem.qty}</span>
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded-md"
                  onClick={() => cartChange(cartItem, 1)}>+</button>
              </div>
            </div>
          ))}

          <textarea className="w-full mt-4 p-2 border rounded-md text-gray-600"
            placeholder="Add delivery instructions..."/>

          <div className="mt-6">
            <h4 className="display-4 text-xl font-medium mb-2">Bill Details</h4>
            <div className="grid grid-cols-2 text-gray-700">
              <p>Item Total</p>
              <p className="text-right">Rs. {itemTotal.toFixed(2)}</p>

              <p>Delivery Fees</p>
              <p className="text-right">Rs. {DeliveryFee}</p>

              <p>Platform Fee</p>
              <p className="text-right">Rs. {PlatformFee}</p>

              <p>GST and Restaurant Fee</p>
              <p className="text-right">Rs. {GST}</p>
            </div>

            <hr className="my-2 border-gray-300" />

            <div className="flex justify-between blockquote">
              TO PAY
              <p>Rs. {ToPay.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
