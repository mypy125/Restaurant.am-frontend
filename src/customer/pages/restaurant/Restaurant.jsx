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
    Alert,
    Button
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import MenuItemCard from "./MenuItemCard";
  import { useDispatch, useSelector } from "react-redux";
  import { useParams } from "react-router-dom";
  import { getRestaurantById, getRestaurantsCategory } from "../../state/restaurant/Action";
  import { getMenuItemsByRestaurantId } from "../../state/menu/Action";
  import { useDebounce } from 'use-debounce';
  
  const foodTypeOptions = ["all", "vegetarian", "non_vegetarian", "seasonal"];
  const Restaurant = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedFoodType, setSelectedFoodType] = useState(foodTypeOptions[0]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { restaurant } = useSelector((store) => store);
    const { menu } = useSelector((store) => store);
    const { id } = useParams();
    
    const [debouncedCategory] = useDebounce(selectedCategory, 500);
    const [debouncedFoodType] = useDebounce(selectedFoodType, 500);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        
        try {
          if (id && jwt) {
            await dispatch(getRestaurantById({ jwt, restaurantId: id }));
            await dispatch(getRestaurantsCategory(jwt, { restaurantId: id }));
            await dispatch(getMenuItemsByRestaurantId({
              jwt,
              restaurantId: id,
              vegetarian: debouncedFoodType === "vegetarian",
              nonveg: debouncedFoodType === "non_vegetarian",
              seasonal: debouncedFoodType === "seasonal",
              foodCategory: debouncedCategory || "",
            }));
          } else {
            setError("Invalid restaurant ID or JWT.");
          }
        } catch (err) {
          console.error(err);
          setError("Error fetching data. Please try again.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [id, jwt, dispatch, debouncedCategory, debouncedFoodType]);
  
    if (loading) {
      return (
        <div className="flex justify-center items-center h-[80vh]">
          <CircularProgress />
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="p-5">
          <Alert severity="error">
            {error}{" "}
            <Button color="inherit" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Alert>
        </div>
      );
    }
  
    if (!restaurant || !restaurant.restaurant) {
      return <div>Restaurant information is currently unavailable. Please try again later.</div>;
    }
  
    return (
      <div className="px-5 lg:px-20">
        <section>
          <h3 className="text-gray-500 py-2 mt-10">
            {`Home/Armenia/${restaurant.restaurant.name}/Order Online`}
          </h3>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images?.length > 0 ? restaurant.restaurant.images[0] : "https://via.placeholder.com/150"}
                alt={restaurant.restaurant?.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images?.length > 1 ? restaurant.restaurant.images[1] : "https://via.placeholder.com/150"}
                alt={restaurant.restaurant?.name}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={restaurant.restaurant?.images?.length > 2 ? restaurant.restaurant.images[2] : "https://via.placeholder.com/150"}
                alt={restaurant.restaurant?.name}
              />
            </Grid>
          </Grid>
          <h1 className="text-4xl py-1 font-semibold">{restaurant.restaurant?.name}</h1>
          <p className="text-gray-500 mt-1">{restaurant.restaurant?.description}</p>
          <p className="py-3 text-orange-300">Open now 10:00am - 22:30pm (Today)</p>
        </section>
        <Divider />
        <section className="pt-[2rem] lg:flex relative">
          <div className="space-y-10 lg:w-[20%]">
            <Card className="p-5 space-y-5 lg:sticky top-28">
              <div>
                <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                  Category
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {restaurant.categories?.length > 0 ? (
                      restaurant.categories.map((item) => (
                        <FormControlLabel
                          key={item.id}
                          value={item.name}
                          control={<Radio />}
                          label={item.name}
                          sx={{ color: "gray" }}
                        />
                      ))
                    ) : (
                      <Typography>No categories available</Typography>
                    )}
                  </RadioGroup>
                </FormControl>
              </div>
              <Divider />
              <div>
                <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                  Food Type
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    name="foodType"
                    value={selectedFoodType}
                    onChange={(e) => setSelectedFoodType(e.target.value)}
                  >
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
            {menu.loading ? (
              <CircularProgress />
            ) : menu.menuItems && menu.menuItems.length > 0 ? (
              menu.menuItems.map((item) => <MenuItemCard key={item.id} item={item} />)
            ) : (
              <Typography>No menu items available</Typography>
            )}
          </div>
        </section>
      </div>
    );
  };
  
  export default Restaurant;
  