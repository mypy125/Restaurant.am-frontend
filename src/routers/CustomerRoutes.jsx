import React from "react";
import { Route, Routes } from 'react-router-dom';
import HomePage from "../customer/pages/homePage/HomePage";
import Restaurant from "../customer/pages/restaurant/Restaurant";

export const CustomerRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/restaurant/:city/:title/:id' element={<Restaurant />} />
        
        </Routes>
    );
};
