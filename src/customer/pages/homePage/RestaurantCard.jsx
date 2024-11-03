import React from "react";
import Card from "@mui/material/Card";
import Chip from '@mui/material/Chip';
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../state/authentication/Action";
import { isPresentInFavorites } from "../../config/logic";

const RestaurantCard = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { favorites } = useSelector(store => store.auth);

    const handleAddToFavorites = (event) => {
        event.stopPropagation(); 
        dispatch(addToFavorite({ restaurantId: item.id, jwt }));
    };
   
    const handleNavigateToRestaurant = () => {
        console.log('Navigating to restaurant:', item);
        navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
    };    

    return (
        <Card
            className="m-5 w-[18rem] productCard hover:shadow-lg transition-shadow duration-300" 
            onClick={handleNavigateToRestaurant}
        >
            <img
                className="w-full h-[10rem] rounded-t-md object-cover"
                src={item.images[0] || "https://via.placeholder.com/150"}
                alt={item.name || "Restaurant Image"}
            />
            <Chip
                size="small"
                className="absolute top-2 left-2"
                color={item.open ? "success" : "error"}
                label={item.open ? "Open" : "Closed"}
            />
            <div className="p-4 textPart lg:flex w-full justify-between">
                <div className="space-y-1">
                    <p className="font-semibold text-lg cursor-pointer">
                        {item.name}
                    </p>
                    <p className="text-gray-500 text-sm">
                        {item.description?.length > 40 
                            ? `${item.description.substring(0, 40)}...` 
                            : item.description || "No description available."}
                    </p>
                </div>
                <IconButton onClick={handleAddToFavorites}>
                    {isPresentInFavorites(favorites, item) 
                        ? <FavoriteIcon /> 
                        : <FavoriteBorderIcon />}
                </IconButton>
            </div>
        </Card>
    );
};

RestaurantCard.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.shape({
            city: PropTypes.string, 
        }).isRequired,
        images: PropTypes.arrayOf(PropTypes.string).isRequired, 
        description: PropTypes.string, 
        open: PropTypes.bool.isRequired,
    }).isRequired,
};

export default RestaurantCard;
