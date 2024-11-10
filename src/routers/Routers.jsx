import React, { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { CustomerRoutes } from "./CustomerRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../customer/state/authentication/Action";
import { findCart } from "../customer/state/cart/Action";
import { AdminRoute } from "./AdminRoute";

const Routers = () => {
    const dispatch=useDispatch()
    const jwt=localStorage.getItem("jwt")
    const {auth}=useSelector(store=>store)
    
    useEffect(() => {
        if (jwt) {
            dispatch(getUser(auth.jwt || jwt));
            dispatch(findCart(jwt));
        }
    },[auth.jwt, dispatch]);

    return (
        <Routes>
            <Route path='/*' element={<CustomerRoutes />} />
            <Route path='/admin/restaurants/*' element={<AdminRoute/>}/>
        </Routes>
    );
};

export default Routers