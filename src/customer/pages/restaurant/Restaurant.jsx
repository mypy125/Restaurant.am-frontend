import {
    Card,
    FormControlLabel,
    Radio,
    Divider,
    FormControl,
    RadioGroup,
    Typography,
    Grid,
    CircularProgress,
    Alert
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurantById, getRestaurantsCategory } from "../../state/restaurant/Action";
import { getMenuItemsByRestaurantId } from "../../state/menu/Action";

const foodTypeOptions = ["Vegetarian Only", "Non-Vegetarian Only", "Both"];

const Restaurant = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedFoodType, setSelectedFoodType] = useState(foodTypeOptions[0]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector((store) => store.restaurant);
    const { menu } = useSelector((store) => store.menu);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                await Promise.all([
                    dispatch(getRestaurantById({ jwt, restaurantId: id })),
                    dispatch(getRestaurantsCategory({ jwt, restaurantId: id })),
                    dispatch(getMenuItemsByRestaurantId({ 
                        jwt, 
                        restaurantId: id, 
                        vegetarian: false, 
                        nonveg: false, 
                        seasonal: true 
                    }))
                ]);
            } catch (err) {
                setError(err.message || "Failed to fetch restaurant data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, jwt, dispatch]);

    const handleFoodTypeChange = (event) => {
        setSelectedFoodType(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!restaurant) {
        return <div className="m-5">Restaurant not found</div>;
    }

    return (
        <div className="px-5 lg:px-20">
            <section>
                <h3 className="text-gray-500 py-2 mt-10">
                    {`Home/Armenia/${restaurant.name}/Order Online`}
                </h3>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <img
                            className="w-full h-[40vh] object-cover"
                            src={restaurant?.image?.[0] || "https://via.placeholder.com/150"}
                            alt={restaurant?.name || "Restaurant Image"}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <img
                            className="w-full h-[40vh] object-cover"
                            src={restaurant?.image?.[1] || "https://via.placeholder.com/150"}
                            alt={restaurant?.name || "Restaurant Image"}
                        />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <img
                            className="w-full h-[40vh] object-cover"
                            src={restaurant?.image?.[2] || "https://via.placeholder.com/150"}
                            alt={restaurant?.name || "Restaurant Image"}
                        />
                    </Grid>
                </Grid>
                <h1 className="text-4xl py-1 font-semibold">{restaurant.name}</h1>
                <p className="text-gray-500 mt-1">{restaurant.description}</p>
                <p className="py-3 text-orange-300">Open now 10:00am - 22:30pm (Today)</p>
            </section>
            <Divider />
            <section className="pt-[2rem] lg:flex relative">
                <div className="space-y-10 lg:w-[20%]">
                    <Card className="p-5 space-y-5 lg:sticky top-28">
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>Category</Typography>
                            <FormControl component="fieldset">
                                <RadioGroup name="category" value={selectedCategory} onChange={handleCategoryChange}>
                                    {restaurant.categories?.map((item) => (
                                        <FormControlLabel
                                            key={item.id}
                                            value={item.name}
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
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>Food Type</Typography>
                            <FormControl component="fieldset">
                                <RadioGroup name="foodType" value={selectedFoodType} onChange={handleFoodTypeChange}>
                                    {foodTypeOptions.map((item) => (
                                        <FormControlLabel
                                            key={item}
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
                    {menu?.map((item) => <MenuItemCard key={item.id} item={item} />)}
                </div>
            </section>
        </div>
    );
};

export default Restaurant;
