import { Button,TextField } from "@mui/material";
import React, { useState } from "react";

const CreateIngredientCategoryForm = () => {
    const [formData, setFormData]=useState({
        name:"",
    })
    const handleSubmit = () => {
        console.log(formData);
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
                <Button variant="contained" type="submit">
                    Create Category
                </Button>
            </div>
        </div>
    )
}

export default CreateIngredientCategoryForm;