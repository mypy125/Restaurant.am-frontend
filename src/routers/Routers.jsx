import React, { useEffect } from "react";
import { Route, Routes } from 'react-router-dom';
import { CustomerRoutes } from "./CustomerRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../customer/state/authentication/Action";

const Routers = () => {
    const dispatch=useDispatch()
    const jwt=localStorage.getItem("jwt")
    const {auth}=useSelector(store=>store)
    
    useEffect(()=> {
        dispatch(getUser(auth.jwt || jwt));
    },[auth.jwt]);

    return (
        <Routes>
            <Route path='/*' element={<CustomerRoutes />} />
        </Routes>
    );
};

export default Routers