import React from "react";
import RestaurantCard from "../pages/homePage/RestaurantCard";
import { useSelector } from "react-redux";

const Favorites = () => {
//   const favoriteRestaurants = JSON.parse(localStorage.getItem("favorites")) || [];
  const {auth}=useSelector(store=>store);

    return (
        <div>
            <h1 className="py-5 text-xl font-semibold text-center">My Favorites</h1>
            <div className="flex flex-wrap gap-5 justify-center">
               {auth.favorites.map((item)=><RestaurantCard item={item}/>)}
            </div>
        </div>
    );
};

export default Favorites;
