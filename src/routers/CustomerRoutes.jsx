import React from "react";
import { Route, Routes } from 'react-router-dom';
import HomePage from "../customer/pages/homePage/HomePage";
import Restaurant from "../customer/pages/restaurant/Restaurant";
import Navbar from "../customer/components/navbar/Navbar";
import Cart from "../customer/pages/cart/Cart";
import Profile from "../customer/profile/Profile";
import Auth from "../customer/components/auth/Auth";
import { PaymentSuccess } from "../customer/components/paymentsucces/PaymentSuccess";

export const CustomerRoutes = () => {
    return (
        <div className="relative">
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/account/:register" element={<HomePage />} />
                <Route path="/restaurant/:city/:title/:id" element={<Restaurant />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/my-profile/*" element={<Profile />} />
                <Route path="/payment/success/:id" element={<PaymentSuccess />} />
            </Routes>
            <Auth/>
        </div>
    );
};
