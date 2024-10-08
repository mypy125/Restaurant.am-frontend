import React from "react";
import { Route, Routes } from 'react-router-dom';
import HomePage from "../customer/pages/homePage/HomePage";

export const CustomerRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
        
        </Routes>
    );
};
