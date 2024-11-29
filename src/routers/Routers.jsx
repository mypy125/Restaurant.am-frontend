import { Route, Routes } from "react-router-dom";
import { CustomerRoutes } from "./CustomerRoutes";
import { AdminRoute } from "./AdminRoute";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from "../customer/state/authentication/Action";
import { findCart } from "../customer/state/cart/Action";
import { getResaurantByUserId } from "../customer/state/restaurant/Action";

const Routers = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    
    dispatch(getUser(auth.jwt || jwt)); 
    dispatch(findCart(jwt)); 
    
  }, [auth.jwt]);

  useEffect(() => {
    
    dispatch(getResaurantByUserId(auth.jwt || jwt)); 
    
  }, [auth.user]);

  return (
    <Routes>
      <Route path="/*" element={<CustomerRoutes />} />
      <Route path="/admin/restaurants/*" element={<AdminRoute />} />
    </Routes>
  );
};

export default Routers;
