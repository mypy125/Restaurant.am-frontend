import React from "react";
import { Route, Routes } from 'react-router-dom';
import HomePage from "../customer/pages/homePage/HomePage";
import Restaurant from "../customer/pages/restaurant/Restaurant";
import Navbar from "../customer/components/navbar/Navbar";
import Cart from "../customer/pages/cart/Cart";

export const CustomerRoutes = () => {
    return (
        <div className="relative">
            <div className="sticky top-0 z-50">
                <Navbar/>
            </div>
            <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/restaurant/:city/:title/:id' element={<Restaurant />} />
            <Route path='/cart' element={<Cart />} />
        
        </Routes>
        </div>
    );
};
