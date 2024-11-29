import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { createIngredient } from "../../customer/state/ingredients/Action";

const CreateIngredientForm = () => {
    const dispatch = useDispatch();
    const { restaurant, ingredients } = useSelector((store) => store);
    const jwt = localStorage.getItem("jwt");
    const [formData, setFormData] = useState({
        name: "",
        categoryId: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.categoryId) {
            alert("Please select a category!");
            return;
        }

        const data = {
            ...formData,
            restaurantId: restaurant.userRestaurant.id,
        };

        console.log("createIngredient data:", data);
        dispatch(createIngredient({ data, jwt }));
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
                                    {item.name || "No Category"}
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem disabled>No categories available</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <Button variant="contained" type="submit">
                    Create Ingredient
                </Button>
            </form>
        </div>
    );
};

export default CreateIngredientForm;
