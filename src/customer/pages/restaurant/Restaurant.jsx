import { Card, FormControlLabel, Radio, Divider, FormControl, RadioGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import MenuItemCard from "./MenuItemCard";

const categories = [
    "Khorovats (Barbecue)",
    "Dolma",
    "Lavash",
    "Harissa",
    "Manti",
    "Lahmajoon",
    "Khash",
    "Ghapama",
    "Basturma",
    "Gata",
]

const foodType = ["Vegetarian Only", "Non-Vegetarian Only", "Both"]
const menu = [1,1,1,1,1,1,1]

const Restaurant = () => {
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
                    <img className="w-full h-[40vh] object-cover" 
                         src="https://images.unsplash.com/photo-1508006728353-6ecef00dcbb8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEzfHx8ZW58MHx8fHx8" 
                         alt="" />
                </div>
                <div>
                    <h1 className="text-4xl py-1 font-semibold">{`Taco Restaurant`}</h1>
                    <p className="text-gray-500">
                        A modern take on traditional cuisine.
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
                                    {categories.map((item, index) => (
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

export default Restaurant