import React from "react";
import { Routes, Route } from "react-router-dom"; 
import { AdminSideBar } from "./AdminSideBar";
import { Orders } from "../order/Orders";
import { Menu } from "../menu/Menu";
import { FoodCategory } from "../foodCategory/FoodCategory";
import { Ingredients } from "../ingredients/Ingredients";
import { Events } from "../events/Events";
import { RestaurantDetails } from "./RestaurantDetails";
import { RestaurantDashboard } from "../dashboard/RestaurantDashboard";
import CreateMenuForm from "../menu/CreateMenuForm";

export const Admin = () => {
    
    const handleClose = () => {
        
    }

    return (
        <div>
            <div className="lg:flex justify-between">
                <div>
                    <AdminSideBar handleClose={handleClose}/>
                </div>
                <div className="lg:w-[80%]">
                    <Routes>
                        <Route path="/" element={<RestaurantDashboard />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/category" element={<FoodCategory />} />
                        <Route path="/ingredients" element={<Ingredients />} />
                        <Route path="/event" element={<Events />} />
                        <Route path="/details" element={<RestaurantDetails />} />
                        <Route path="/add-menu" element={<CreateMenuForm />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};
