import React from "react";
import RestaurantCard from "../pages/homePage/RestaurantCard";

const Favorites = () => {
  const favoriteRestaurants = JSON.parse(localStorage.getItem("favorites")) || [];

    return (
        <div>
            <h1 className="py-5 text-xl font-semibold text-center">My Favorites</h1>
            <div className="flex flex-wrap gap-5 justify-center">
                {favoriteRestaurants.length === 0 ? (
                    <div className="text-center">No favorites added yet.</div>
                ) : (
                    favoriteRestaurants.map((item, index) => (
                        <RestaurantCard key={index} item={item} index={index} />
                    ))
                )}
            </div>
        </div>
    );
};


export default Favorites;
