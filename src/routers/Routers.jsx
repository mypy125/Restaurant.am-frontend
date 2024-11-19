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
    if (jwt && auth.jwt !== jwt) {
      dispatch(getUser(jwt)); 
      dispatch(findCart(jwt)); 
    }
  }, [jwt, auth.jwt, dispatch]);

  useEffect(() => {
    if (auth.jwt) {
      dispatch(getResaurantByUserId(auth.jwt)); 
    }
  }, [auth.user, auth.jwt, dispatch]);

  return (
    <Routes>
      <Route path="/*" element={<CustomerRoutes />} />
      <Route path="/admin/restaurants/*" element={<AdminRoute />} />
    </Routes>
  );
};

export default Routers;
