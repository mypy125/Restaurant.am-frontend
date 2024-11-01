import React, { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import Chip from '@mui/material/Chip';
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite } from "../../state/authentication/Action";

const RestaurantCard = ({ item, index }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { auth } = useSelector((store) => store);

    const handleAddToFavorite = () => {
        dispatch(addToFavorite({ restaurantId: item.id, jwt }));
    };

    const handleNavigateToRestaurant = () => {
        if (item.open) {
            navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`);
        }
    };

    const getFavorites = useCallback(() => {
        try {
            return JSON.parse(localStorage.getItem("favorites")) || [];
        } catch (error) {
            console.error("Failed to parse favorites from localStorage", error);
            return [];
        }
    }, []);

    useEffect(() => {
        const favorites = getFavorites();
        const isFavorited = favorites.some((fav) => fav.name === item.name);
        setIsFavorite(isFavorited);
    }, [item, getFavorites]);

    const toggleFavorite = useCallback(() => {
        setIsFavorite((prev) => {
            const favorites = getFavorites();
            const updatedFavorites = prev
                ? favorites.filter((fav) => fav.name !== item.name)
                : [...favorites, item];

            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            return !prev;
        });
    }, [item, getFavorites]);

    const handleCardClick = () => {
        const encodedCity = encodeURIComponent(item.city || "");
        const encodedName = encodeURIComponent(item.name || "");
        navigate(`/restaurant/${encodedCity}/${encodedName}/${index + 1}`);
    };

    if (!item.name) {
        return <div className="m-5">Item not found</div>;
    }

    return (
        <Card
            className="m-5 w-[18rem] productCard hover:shadow-lg transition-shadow duration-300"
            onClick={handleCardClick}
        >
            <img
                className="w-full h-[10rem] rounded-t-md object-cover"
                src={item.imageUrl}
                alt={item.name || "Restaurant Image"}
                onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
            />
            <Chip
                size="small"
                className="absolute top-2 left-2"
                color={item.open ? "success" : "error"}
                label={item.open ? "Open" : "Closed"}
            />
            <div className="p-4 textPart lg:flex w-full justify-between">
                <div className="space-y-1">
                    <p onClick={handleNavigateToRestaurant} className="font-semibold text-lg cursor-pointer">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                        {item.description.length > 40 ? `${item.description.substring(0, 40)}...` : item.description}
                    </p>
                </div>
                <IconButton onClick={toggleFavorite}>
                    {isFavorite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                </IconButton>
            </div>
        </Card>
    );
};

RestaurantCard.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string,
        city: PropTypes.string,
        imageUrl: PropTypes.string,
        description: PropTypes.string,
        open: PropTypes.bool,
    }).isRequired,
    index: PropTypes.number.isRequired,
};

export default RestaurantCard;