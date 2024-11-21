import { Button,TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createIngredientCategory } from "../../customer/state/ingredients/Action";

const CreateIngredientCategoryForm = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {restaurant} = useSelector(store => store)
    const [formData, setFormData]=useState({
        name:"",
        categoryId:""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data={
            name:formData.name,
            restaurantId:restaurant.userRestaurant.id
        }
        console.log(data);
        dispatch(createIngredientCategory({data,jwt}))
        setFormData({ name: "", categoryId: "" });
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
                    Create Ingredient Category
                    </h1>
                <form onSubmit={handleSubmit}></form>
                <TextField fullWidth
                    id="name"
                    name="name"
                    label="category"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.name}
                />
                <Button onClick={handleSubmit} variant="contained" type="submit">
                    Create Category
                </Button>
            </div>
        </div>
    )
}

export default CreateIngredientCategoryForm;