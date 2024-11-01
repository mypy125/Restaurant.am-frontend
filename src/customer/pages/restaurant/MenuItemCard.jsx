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
                    src={item.images[0]}
                    alt=""
                />
                <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
                <p className="font-semibold text-xl">{item.name}</p>
                    <p>{item.price}</p>
                    <p className="text-gray-500">{item.description}</p>
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
