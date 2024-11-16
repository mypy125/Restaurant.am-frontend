import {
     Button,TextField,FormControl,InputLabel,Select,MenuItem
 } from "@mui/material";
import React, { useState } from "react";

const CreateIngredientForm = () => {
    const [formData, setFormData]=useState({name:"",ingredientCategoryId:""})
    const handleSubmit = () => {
        const data={
            name:formData.categoryName,
            restaurantId:{
                id:1
            },
        };
        console.log("data--",data);
    };

    const handleInputChange = (e) => {
        const {name,value} =e.target
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
                    id="categoryName"
                    name="categoryName"
                    label="Cuisine Type"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.categoryName}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData.ingredientCategoryId}
                      label="category"
                      onChange={handleInputChange}
                      name="ingredientCategoryId"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" type="submit">
                    Create Category
                </Button>
            </div>
        </div>
    )
}

export default CreateIngredientForm;