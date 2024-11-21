import {
     Button,TextField,FormControl,InputLabel,Select,MenuItem
 } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredient } from "../../customer/state/ingredients/Action";

const CreateIngredientForm = () => {
    const dispatch = useDispatch();
    const {restaurant,ingredients} = useSelector((store)=> store)
    const jwt = localStorage.getItem("jwt")
    const [formData, setFormData]=useState({
        name:"",
        categoryId:"",
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        const data={
            name:formData.name,
            categoryId: formData.categoryId,
            restaurantId:restaurant.userRestaurant.id
        };
        console.log(data);
        dispatch(createIngredient({data,jwt}))
    };

    const handleInputChange = (e) => {
        const {name,value} = e.target
        setFormData({
            ...formData,[name]:value
        })
    }


    return(
        <div>
            <div className="p-5 space-y-5">
                <h1 className="text-gray-400 text-center text-xl pb-10">
                    Create Ingredient
                </h1>
                <form onSubmit={handleSubmit}></form>
                <TextField fullWidth
                    id="name"
                    name="name"
                    label="Name"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.name}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.categoryId}
                      label="category"
                      onChange={handleInputChange}
                      name="categoryId"
                    >
                     {ingredients.category.map((item) => (
                        <MenuItem value={item.id}>{item.name}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <Button onClick={handleSubmit} variant="contained" type="submit">
                    Create Ingredient
                </Button>
            </div>
        </div>
    )
}

export default CreateIngredientForm;