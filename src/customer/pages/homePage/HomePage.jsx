import React from "react";
import "./HomePage.css";
import MultipleItemCorusel from "./MultipleItemCorusel";
import RestaurantCard from "./RestaurantCard";
import restaurants from '../../../Data/Restaurants';

const HomePage = () => {
    return (
        <div>
            <section className='-z-50 banner relative flex flex-col justify-center items-center'>
                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-2xl lg:text-7xl font-bold z-10 py-5'>Restaurant.am</p>
                    <p className='z-10 text-gray-200 text-xl lg:text-2xl'>
                    Savor the authentic taste of Armenian cuisine — tradition and aroma in every dish!
                    </p>
                </div>
                <div className='cover absolute top-0 left-0 right-0'></div>
                <div className='fadout'></div>
            </section>

            <section className="p-10 lg:py-10 lg:px-20">
                <div>
                    <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">Top Meals</p>
                </div>
                <MultipleItemCorusel />
            </section>

            <section className="px-5 lg:px-20">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-400 py-3">
                        Order From Our Handpicked Favorites
                    </h1>
                    <div className="flex flex-wrap items-center justify-around">
                        {restaurants.map((item, index) => (
                            <RestaurantCard key={`${item.name}-${index}`} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;