import { Card, FormControlLabel, Radio, Divider, FormControl, RadioGroup, Typography } from "@mui/material";
import React, {  useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getResaurantById, getRestaurantsCategory } from "../../state/restaurant/Action";

// const categories = [
//     "appetizers",
//     "salads",
//     "soups",
//     "hot dishes",
//     "dough dishes",
//     "kebab dishes",
//     "fish",
//     "side dishes",
//     "lunch",
//     "sauce",
// ]

const foodType = [
    "Vegetarian Only", 
    "Non-Vegetarian Only", 
    "Both"
]

const menu = [1,1,1,1,1,1,1]

const Restaurant = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {auth, restaurant}=useSelector(store=>store);

    const {id, city}=useParams();

    console.log("restaurant", restaurant);

    useEffect(()=> {
        dispatch(getResaurantById({jwt,restaurantId:id}))
        dispatch(getRestaurantsCategory({jwt, restaurantId:id}))

    },[])

    const [selectedCategory, setSelectedCategory] = useState();
    const [selectedFoodType, setSelectedFoodType] = useState();

    const handleFoodTypeChange = (event) => {
        setSelectedFoodType(event.target.value);
        console.log("Selected Food Type - ", event.target.value);
    }

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        console.log("Selected Category - ", event.target.value);
    }

    return (
        <div className="px-5 lg:px-20">
            <section>
                <h3 className="text-gray-500 py-2 mt-10">
                    {`Home/Armenia/Taco Restaurant/2/Order Online`}
                </h3>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <img className="w-full h-[40vh] object-cover" 
                            src={restaurant.restaurant?.image[0]}
                            alt="" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className="w-full h-[40vh] object-cover" 
                            src={restaurant.restaurant?.image[1]}
                            alt="" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className="w-full h-[40vh] object-cover" 
                            src={restaurant.restaurant?.image[2]}
                            alt="" />
                        </Grid>
                    </Grid>
                    
                </div>
                <div>
                    <h1 className="text-4xl py-1 font-semibold">{restaurant.restaurant?.name}</h1>
                    <p className="text-gray-500 mt-1">
                        {restaurant.restaurant?.description}
                    </p>
                    <p className="py-3 text-orange-300">
                        Open now 10:00am - 22:30am (Today)
                    </p>
                </div>
            </section>
            <Divider />

            <section className="pt-[2rem] lg:flex relative">
                <div className="space-y-10 lg:w-[20%]">
                    <Card className="p-5 space-y-5 lg:sticky top-28">
                        <div>
                            <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                                Category
                            </Typography>
                            <FormControl component={"fieldset"}>
                                <RadioGroup name="category" value={selectedCategory} onChange={handleCategoryChange}>
                                    {restaurant.categories.map((item) => (
                                        <FormControlLabel
                                            key={item}
                                            value={item}
                                            control={<Radio />}
                                            label={item.name}
                                            sx={{ color: "gray" }}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider />
                        <div>
                            <Typography sx={{ paddingBottom: "1rem" }} variant="h5">
                                Food Type
                            </Typography>
                            <FormControl component={"fieldset"}>
                                <RadioGroup name="foodType" value={selectedFoodType} onChange={handleFoodTypeChange}>
                                    {foodType.map((item, index) => (
                                        <FormControlLabel
                                            key={index}
                                            value={item}
                                            control={<Radio />}
                                            label={item}
                                            sx={{ color: "gray" }}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </Card>
                </div>
                <div className="lg:w-[80%] space-y-5 lg:pl-10">

                    {menu.map((item)=><MenuItemCard item={item}/>)}

                </div>
            </section>
        </div>
    );
}

export default Restaurant;