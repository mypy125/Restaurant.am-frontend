import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { topMeels } from "./TopMeels";
import CarouselItem from "./CarouselItem";

const MultipleItemCorusel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3, 
        slidesToScroll: 1,
        autoplay: true, 
        autoplaySpeed: 2000,
        arrows: false
    };

    return (
        <div>
            <Slider {...settings}>
                {topMeels.map((item, index) => (
                    <CarouselItem key={index} image={item.image} title={item.title} />
                ))}
            </Slider>
        </div>
    );
};

export default MultipleItemCorusel