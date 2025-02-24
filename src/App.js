import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Header from './MyComponents/Header.js';
import MainPage from './MyComponents/MainPage.js';
import RestaurantView from "./MyComponents/RestaurantView.js"; 
import { useState,useEffect } from 'react';
import Cart from './MyComponents/CartPage.js';

function App() {
    const [cart,setCart]=useState(() => {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);
  return (
    <div className="App">
      <Router>
      <Header/>
      <div className="content">
      <Routes>
        <Route exact path="/" element={<MainPage/>}></Route>
        <Route exact path="/restaurant/:id" element={<RestaurantView cart={cart} setCart={setCart}/>}></Route>
        <Route exact path="/cart" element={<Cart cart={cart} setCart={setCart}/>}></Route>
      </Routes>
      </div>
      </Router>
    </div>
  );
}

export default App;
