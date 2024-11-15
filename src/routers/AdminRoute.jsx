import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateRestaurantForm from "../adminComponent/createRestaurantForm/CreateRestaurantForm";
import { Admin } from "../adminComponent/admin/Admin";

export const AdminRoute = () => {
    return(
        <div>
            <Routes>
                <Route path="/*" element={false?<CreateRestaurantForm/>:<Admin/>}>

                </Route>
            </Routes>
        </div>
    )
}

