import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import CreateRestaurantForm from "../adminComponent/createRestaurantForm/CreateRestaurantForm.jsx";
import { Admin } from "../adminComponent/admin/Admin";

export const AdminRoute = () => {
const {restaurant} = useSelector((store)=> store)

    return (
        <Routes>
            <Route
                path="/*" element={!restaurant?.userRestaurant ? <CreateRestaurantForm /> : <Admin /> } />
        </Routes>
    );
};
