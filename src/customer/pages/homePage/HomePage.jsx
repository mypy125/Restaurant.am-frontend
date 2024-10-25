import React, { useEffect } from "react";
import "./HomePage.css";
import MultipleItemCorusel from "./MultipleItemCorusel";
import RestaurantCard from "./RestaurantCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllResaurantsAction } from "../../state/restaurant/Action";

const HomePage = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurants, loading, error } = useSelector((state) => state.restaurant);

    useEffect(() => {
        if (jwt && !restaurants.length) {  
            dispatch(getAllResaurantsAction(jwt));
        }
    }, [jwt, dispatch, restaurants.length]);

    return (
        <div>
            {/* Banner Section */}
            <section className="-z-50 banner relative flex flex-col justify-center items-center">
                <div className="w-[50vw] z-10 text-center">
                    <p className="text-2xl lg:text-7xl font-bold z-10 py-5">Restaurant.am</p>
                    <p className="z-10 text-gray-200 text-xl lg:text-2xl">
                        Savor the authentic taste of Armenian cuisine — tradition and aroma in every dish!
                    </p>
                </div>
                <div className="cover absolute top-0 left-0 right-0"></div>
                <div className="fadout"></div>
            </section>

            {/* Top Meals Section */}
            <section className="p-10 lg:py-10 lg:px-20">
                <div>
                    <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">Top Meals</p>
                </div>
                <MultipleItemCorusel />
            </section>

            {/* Restaurant List Section */}
            <section className="px-5 lg:px-20">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-400 py-3">
                        Order From Our Handpicked Favorites
                    </h1>
                    <div className="flex flex-wrap items-center justify-around">
                        {loading ? (
                            <p>Loading restaurants...</p>
                        ) : error ? (
                            <p className="text-red-500">Failed to load restaurants. Please try again later.</p>
                        ) : restaurants.length > 0 ? (
                            restaurants.map((item, index) => (
                                <RestaurantCard key={`${item.name}-${index}`} item={item} index={index} />
                            ))
                        ) : (
                            <p>No restaurants available at the moment.</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
