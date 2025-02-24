import React, { useState, useEffect } from "react";
import axios from "axios";

export default function RestaurantDetails({ RestaurantId,cart,setCart }) {
    const [menu, setRestaurantMenu] = useState([]);
    //const [cart,setCart] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:44326/api/Restaurant/${RestaurantId}/menu`)
            .then((result) => {
                setRestaurantMenu(result.data);
            })
            .catch((error) => console.log(error));
    }, [RestaurantId]);

    useEffect(()=>{
        console.log(cart);
    },[cart]);

    const addToCart = (product,qtyChange) => {
        setCart((prevCart) => {
        if(qtyChange>0){
            const itemExists = prevCart.find((item) => item.itemID === product.itemID);
            if (itemExists) {
                return prevCart.map((item) =>
                    item.itemID === product.itemID ? { ...item, qty: item.qty + qtyChange} : item
                );
            }
            return [...prevCart, { ...product,qty:1}];
        }
        else{
            return prevCart
            .map((item) =>
              item.itemID === product.itemID ? { ...item, qty: item.qty + qtyChange } : item
            )
            .filter((item) => item.qty > 0);
        }
        });
    }
    
    return (
        <>
            {menu.map((item, index) => {
                const cartItem = cart.find((cartItem) => cartItem.itemID === item.itemID);
                const quantity = cartItem ? cartItem.qty : 0;
                return(
                <div className="container p-2 rounded shadow-sm" key={item.itemID}>
                    <div className="row align-items-center">
                        <div className="col-7">
                            <h6 className="mb-1">{item.itemName}</h6>
                            <p className="text-success" style={{ fontSize: "0.9rem", marginBottom: "5px" }}>{"Rs. " +item.itemPrice+"/-"}</p>
                            <p className="text-muted" style={{ fontSize: "0.9rem", marginBottom: "5px" }}>{item.itemDescription}</p>
                        </div>
                        <div className="col-5 text-end d-flex flex-column align-items-center">
                            <img 
                                src={item.imageUrl} 
                                className="img-fluid rounded" 
                                style={{ maxHeight: "80px", width: "80px" }} 
                                alt={item.itemName}
                            />
                            <div className="row px-4 mt-2">
                                {quantity === 0?
                                <button className="btn btn-outline-danger" onClick={() => addToCart(item,1)}>Add</button>:
                                <div className="btn-grp btn-danger">
                                <button className="btn btn-danger" onClick={() => addToCart(item,-1)}>-</button>
                                <span className="px-2">{quantity}</span>
                                <button className="btn btn-danger" onClick={() => addToCart(item,1)}>+</button>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                    <hr className="my-2" />
                </div>
                );
            }
        )}
        </>
    );
}
