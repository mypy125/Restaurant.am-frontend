import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { createIngredient } from "../../customer/state/ingredients/Action";

const CreateIngredientForm = () => {
    const dispatch = useDispatch();
    const { restaurant, ingredients } = useSelector((store) => store);
    const jwt = localStorage.getItem("jwt");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        categoryId: "",
    });

    if (!restaurant?.userRestaurant?.id || !jwt) {
        return <p>Please log in and select a restaurant to create an ingredient.</p>;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.categoryId) {
            alert("Please select a category!");
            return;
        }

        setIsSubmitting(true);
        const data = {
            ...formData,
            restaurantId: restaurant.userRestaurant.id,
        };

        try {
            console.log("createIngredient data:", data);
            await dispatch(createIngredient({ data, jwt }));
            setFormData({ name: "", categoryId: "" }); 
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="p-5 space-y-5">
            <h1 className="text-gray-400 text-center text-xl pb-10">Create Ingredient</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
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
                        label="Category"
                        onChange={handleInputChange}
                        name="categoryId"
                    >
                        {ingredients?.category?.length > 0 ? (
                            ingredients.category.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name || "No Name"}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No categories available. Please create a category first.</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <Button variant="contained" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Create Ingredient"}
                </Button>
            </form>
        </div>
    );
};

export default CreateIngredientForm;
