import { Button,TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../customer/state/restaurant/Action";

const CreateFoodCategoryForm = () => {
    const restaurant = useSelector((state) => state.restaurant);
    const dispatch = useDispatch();
    const [formData, setFormData]=useState({categoryName:"",restaurantId:""})

    const handleSubmit = (e) => {
        e.preventDefault();

        const data={
            name:formData.categoryName,
            restaurantId:restaurant.userRestaurant.id,
        };
        dispatch(createCategoryAction({reqData:data, jwt:localStorage.getItem("jwt")}));
        console.log("Submitted data:", data);

    };

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value,
        });
    };

    return(
        <div>
            <div className="p-5 space-y-5">
                <h1 className="text-gray-400 text-center text-xl pb-10">
                    Create Food Category
                </h1>
                <form onSubmit={handleSubmit}></form>
                <TextField fullWidth
                    id="categoryName"
                    name="categoryName"
                    label="Food Category"
                    variant="outlined"
                    onChange={handleInputChange}
                    value={formData.categoryName}>
                </TextField>

                <Button onClick={handleSubmit} variant="contained" type="submit">
                    Create Category
                </Button>
            </div>
        </div>
    )
}

export default CreateFoodCategoryForm;