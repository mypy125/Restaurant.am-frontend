import { CircularProgress, FormControl, InputLabel, OutlinedInput, 
  Grid, IconButton, TextField, Button, Select, MenuItem, Box, Chip
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImageToCloudinary } from "../util/uploadToCloudinary";
import { useDispatch, useSelector } from "react-redux";
import { createMenuItem } from "../../customer/state/menu/Action";
import { getIngredientOfRestaurant } from "../../customer/state/ingredients/Action";

const initialValues = {
name: '',
description: '',
price: '',
category: '', 
images: [],
vegetarian: false,
seasonal: false,
ingredients: [], 
}

const CreateMenuForm = () => {
  const dispatch = useDispatch();
  const { restaurant, ingredients } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  
  const [uploadImage, setUploadImage] = useState(false);
  
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const requestData = {
        name: values.name,
        description: values.description,
        price: Number(values.price),  
        category: {
          id: Number(values.category) || 0, 
        },
        images: values.images, 
        vegetarian: values.vegetarian,
        seasonal: values.seasonal,
        ingredients: values.ingredients
          .map((ingredientId) => {
            const ingredient = ingredients.ingredients.find(item => item.id === ingredientId);
    
            if (ingredient && ingredient.category) {
              return {
                id: ingredient.id,
                name: ingredient.name,
                category: {
                  id: ingredient.category.id,
                  name: ingredient.category.name
                }
              };
            } else {
              console.error(`Ingredient with ID ${ingredientId} not found or missing category`);
              return null; 
            }
          })
          .filter(item => item !== null), 
        restaurantId: restaurant.userRestaurant.id, 
      };
    
      console.log("Request payload:", requestData);
      
      dispatch(createMenuItem({ menu: requestData, jwt }));
    },    
  });
  
  useEffect(() => {
      if (jwt && restaurant.userRestaurant.id) {
        dispatch(getIngredientOfRestaurant({ jwt, id: restaurant.userRestaurant.id }));
      }
  }, [jwt, restaurant.userRestaurant.id, dispatch]);

  const handleRemoveImage = (index) => {
      const updatedImages = [...formik.values.images];
      updatedImages.splice(index, 1);
      formik.setFieldValue("images", updatedImages);
  }

  const handleImageChange = async (e) => {
      const file = e.target.files[0];
      setUploadImage(true);
      const image = await uploadImageToCloudinary(file);
      console.log("image --- ", image);
      formik.setFieldValue("images", [...formik.values.images, image]);
      setUploadImage(false);
  }

  return (
      <div className="py-10 px-5 lg:flex items-center justify-center min-h-screen">
          <div className="lg:max-w-4xl">
              <h1 className="font-bold text-2xl text-center py-2">
                  Add New Menu
              </h1>
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <Grid container spacing={2}>
                      <Grid className="flex flex-wrap gap-5" item xs={12}>
                          <input
                              accept="image/*"
                              id="fileInput"
                              style={{ display: "none" }}
                              onChange={handleImageChange}
                              type="file"
                          />
                          <label className="relative" htmlFor="fileInput">
                              <span className="w-24 h-24 cursor-pointer flex items-center 
                              justify-center p-3 border rounded-md border-gray-600">
                                  <AddPhotoAlternate className="text-white" />
                              </span>
                              {uploadImage && <div className="absolute left-0 right-0 top-0 
                              bottom-0 w-24 h-24 flex justify-center items-center">
                                  <CircularProgress />
                              </div>}
                          </label>
                          <div className="flex flex-wrap gap-2">
                              {formik.values.images.map((image, index) => (
                                  <div className="relative" key={index}>
                                      <img className="w-24 h-24 object-cover"
                                          src={image}
                                          alt={`image-${index}`}
                                      />
                                      <IconButton size="small"
                                          sx={{
                                              position: "absolute",
                                              top: 0,
                                              right: 0,
                                              outline: "none"
                                          }}
                                          onClick={() => handleRemoveImage(index)}>
                                          <CloseIcon sx={{ fontSize: "1rem" }} />
                                      </IconButton>
                                  </div>
                              ))}
                          </div>
                      </Grid>
                      <Grid item xs={12}>
                          <TextField fullWidth
                              id="name"
                              name="name"
                              label="Name"
                              variant="outlined"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.name}
                          />
                      </Grid>
                      <Grid item xs={12}>
                          <TextField fullWidth
                              id="description"
                              name="description"
                              label="Description"
                              variant="outlined"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.description}
                          />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                          <TextField fullWidth
                              id="price"
                              name="price"
                              label="Price"
                              variant="outlined"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.price}
                          />
                      </Grid>
                      <Grid item xs={12} lg={6}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={formik.values.category}
                              label="Category"
                              onChange={formik.handleChange}
                              name="category"
                            >
                             {restaurant.categories?.map((item) => (
                               <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                             ))}
                            </Select>
                          </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-multiple-chip-label">Ingredients</InputLabel>
                            <Select
                              labelId="demo-multiple-chip-label"
                              id="demo-multiple-chip"
                              name="ingredients"
                              multiple
                              value={formik.values.ingredients || []} 
                              onChange={(e) => {
                                const selectedIngredients = e.target.value;
                                formik.setFieldValue("ingredients", selectedIngredients);
                              }}
                              input={<OutlinedInput id="select-multiple-chip" label="Ingredients" />}
                              renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {selected.map((value) => {
                                    const ingredient = ingredients?.ingredients?.find((item) => item.id === value);
                                    return ingredient ? (
                                      <Chip key={value} label={ingredient.name} />
                                    ) : null;
                                  })}
                                </Box>
                              )}
                            >
                              {ingredients?.ingredients?.map((item) => (
                                <MenuItem key={item.id} value={item.id}> 
                                  {item.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Is Seasonal</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="seasonal"
                              value={formik.values.seasonal}
                              label="Is Seasonal"
                              onChange={formik.handleChange}
                              name="seasonal"
                            >
                              <MenuItem value={true}>Yes</MenuItem>
                              <MenuItem value={false}>No</MenuItem>
                            </Select>
                          </FormControl>
                      </Grid>
                      <Grid item xs={12} lg={6}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Is Vegetarian</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="vegetarian"
                              value={formik.values.vegetarian}
                              label="Is Vegetarian"
                              onChange={formik.handleChange}
                              name="vegetarian"
                            >
                              <MenuItem value={true}>Yes</MenuItem>
                              <MenuItem value={false}>No</MenuItem>
                            </Select>
                          </FormControl>
                      </Grid>
                  </Grid>
                  <Button variant="contained" color="primary" type="submit">
                      Create Menu
                  </Button>
              </form>
          </div>
      </div>
  )
}

export default CreateMenuForm;