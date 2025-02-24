import React,{useState,useEffect} from "react";
import { Link } from 'react-router-dom';

export default function Cart({cart, setCart}){
    const [itemTotal,setItemTotal]=useState(0.0);
    let DeliveryFee=30;
    let PlatformFee=6;
    const [GST,setGST]=useState(0.0);
    const [ToPay,setToPay]=useState(0.0);

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
        setCart((prevCart) => {
          return prevCart
            .map((item) =>
              item.itemID === product.itemID ? { ...item, qty: item.qty + qtyChange } : item
            )
            .filter((item) => item.qty > 0); // Remove items with qty <= 0
        });
      };

    return(
        <>
        <div>
            {
            cart.length===0 ?
            (
                <div className="container text-center">
                <p className="mt-4 blockquote">Your cart is empty</p>
                <Link to="/"><button className="btn btn-lg btn-danger">See Restaurants Near You</button></Link>
                </div>
            ):
            (
            <>
            <h3 className="my-3 text-center">Cart Items</h3>
            <div className="container p-2 rounded shadow-sm">
            {cart.map((cartItem)=>{
            return (
                    <div className="row align-items-center" key={cartItem.itemID}>
                        <div className="col-7">
                            <h6 className="mb-1">{cartItem.itemName}</h6>
                            <p className="text-success" style={{ fontSize: "0.9rem", marginBottom: "5px" }}>{"Rs. " +cartItem.itemPrice+"/-"}</p>
                            <p className="text-muted" style={{ fontSize: "0.9rem", marginBottom: "5px" }}>{cartItem.itemDescription}</p>
                        </div>
                        <div className="col-5 text-end d-flex flex-column align-items-center">
                                <div className="row px-4 mt-2">
                                    {
                                    <div className="btn-grp btn-danger">
                                    <button className="btn btn-danger" onClick={()=>{cartChange(cartItem,-1)}}>-</button>
                                    <span className="px-2">{cartItem.qty}</span>
                                    <button className="btn btn-danger" onClick={()=>{cartChange(cartItem,1)}}>+</button>
                                    </div>
                                    }
                                </div>
                        </div>
                    </div>
            )
            })}
            <div className="input-group mt-4">
            <textarea className="form-control" placeholder="Add delivery instructions.." aria-label="Instructions"></textarea>
            </div>
            <hr/>
            <div className="lead font-weight-bold mb-4">
                Bill details
            </div>
            <div className="row">
            <div className="col-7">
                <p>Item Total</p>
                <p>Delivery Fees</p>
                <p>Platform Fee</p>
                <p>GST and Restaurant Fee</p>
            </div>
            <div className="col-5 text-end d-flex flex-column align-items-center">
            <p>Rs.{itemTotal}</p>
            <p>Rs.{DeliveryFee}</p>
            <p>Rs.{PlatformFee}</p>
            <p>Rs.{GST}</p>
            </div>
            </div>
            <hr className="border-2 border-top border-dark" />
            <div className="row">
            <p className="col-7">TO PAY</p>
            <p className="col-5 text-end d-flex flex-column align-items-center">Rs.{ToPay}</p>
            </div>
            </div>
            </>
            )}
    </div>
    </>
    );
}