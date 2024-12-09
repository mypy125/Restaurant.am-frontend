import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControlLabel, FormGroup, Typography } from "@mui/material";
import CheckBox from "@mui/material/Checkbox";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../state/cart/Action";
import categorizeIngredients from "../../components/util/categorizeIngredints";

const MenuItemCard = React.memo(({ item }) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const dispatch = useDispatch();

    const handleCheckBoxChange = (ingredientName) => {
        setSelectedIngredients((prev) => {
            if (!ingredientName) return prev;
            if (prev.includes(ingredientName)) {
                return prev.filter((item) => item !== ingredientName);
            } else {
                return [...prev, ingredientName];
            }
        });
    };

    const handleAddItemToCart = (e) => {
        e.preventDefault();
        const reqData = {
            token: localStorage.getItem("jwt"),
            cartItem: {
                foodId: item.id,
                quantity: 1,
                ingredients: selectedIngredients,
            },
        };
        dispatch(addItemsToCart(reqData));
        console.log("req Data ", reqData);
    };

    return (
        <Accordion>
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon />} 
                aria-controls={`panel-${item.id}-content`} 
                id={`panel-${item.id}-header`}
            >
                <div className="lg:flex items-center justify-between">
                    <div className="lg:flex items-center lg:gap-5">
                        <img
                            className="w-[7rem] h-[7rem] object-cover"
                            src={item.images[0] || "https://via.placeholder.com/150"}
                            alt={item.name}
                        />
                        <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                            <p className="font-semibold text-xl">{item.name}</p>
                            <p>{item.price}</p>
                            <p className="text-gray-400">{item.description}</p>
                        </div>
                    </div>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <form onSubmit={handleAddItemToCart}>
                    <div className="flex gap-5 flex-wrap">
                        {Object.entries(categorizeIngredients(item.ingredients || []))
                         .map(([category, ingredients]) => (
                             <div key={category}>
                                 <Typography variant="h6">{category}</Typography>
                                 <FormGroup>
                                     {ingredients.length > 0 ? (
                                         ingredients.map((ingredient) => (
                                             <FormControlLabel
                                                 key={ingredient.id || ingredient.name}
                                                 control={<CheckBox onChange={() => handleCheckBoxChange(ingredient.name)} />}
                                                 label={ingredient.name}
                                             />
                                         ))
                                     ) : (
                                         <Typography>No ingredients available</Typography>
                                     )}
                                 </FormGroup>
                             </div>
                         ))}
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            onClick={handleAddItemToCart}
                            disabled={!item.isAvailable}  
                        >
                            {item.isAvailable ? "Add To Cart" : "Out of Stock"}  
                        </Button>
                    </div>
                </form>
            </AccordionDetails>
        </Accordion>
    );
});

export default MenuItemCard;
