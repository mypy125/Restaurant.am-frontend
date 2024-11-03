import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FormControlLabel, FormGroup } from "@mui/material";
import CheckBox from "@mui/material/Checkbox"; 
import categorizeIngredients from '../../components/util/categorizeingredints.js';

const demo = [
    {
        category: "Nuts & seeds",
        ingredients: ["Cashews"]
    },
    {
        category: "Protein",
        ingredients: ["Ground beef", "Bacon strips"] 
    }
];

const MenuItemCard = React.memo(({ item }) => { 
    const handleCheckBoxChange = (value) => {
        console.log(value);
    };

    const handleAddItemToCart = () => {
        console.log(`Added ${item.name} to the cart!`);
    };

    return (
        <Accordion>
            <AccordionSummary 
                expandIcon={<ExpandMoreIcon />} 
                aria-controls="panel1a-content" 
                id="panel1a-header"
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
                <form>
                    <div className="flex gap-5 flex-wrap">
                        {Object.entries(categorizeIngredients(item.ingredients)).map(([category, ingredients]) => ( 
                            <div key={category}> 
                                <p>{category}</p>
                                <FormGroup>
                                    {ingredients.map((ingredient) => ( 
                                        <FormControlLabel 
                                            key={ingredient} 
                                            control={
                                                <CheckBox 
                                                    onChange={() => handleCheckBoxChange(ingredient)} 
                                                />
                                            } 
                                            label={ingredient}
                                        />
                                    ))}
                                </FormGroup>
                            </div>
                        ))}
                    </div>
                    <div>
                        <Button variant="contained" disabled={false} type="submit">
                           {true ? "Add To Cart" : "Out of stock"}  
                        </Button>
                    </div>
                </form>
            </AccordionDetails>
        </Accordion>
    );
});

MenuItemCard.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired,
        ingredients: PropTypes.arrayOf(PropTypes.string).isRequired, 
    }).isRequired,
};

export default MenuItemCard;
