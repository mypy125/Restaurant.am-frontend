import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

const MenuItemCard = ({item}) => {
    const handleAddItemToCart = () => {
        console.log(`Added ${item.name} to the cart!`);
    };

    return (
        <Card className="p-5 lg:flex items-center justify-between box">
            <div className="lg:flex items-center lg:space-x-5">
                <img
                    className="w-[7rem] h-[7rem] object-cover"
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D"
                    alt="Pizza"
                />
                <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                <p className="font-semibold text-xl">Pizza</p>
                    <p>2999</p>
                    <p className="text-gray-500">
                        Pizza is an Italian food that was created in Italy (The Naples area).
                    </p>
                </div>
            </div>

            <div>
                <Button variant="contained" onClick={handleAddItemToCart}>
                    Add To Cart
                </Button>
            </div>
        </Card>
    );
};

export default MenuItemCard;
