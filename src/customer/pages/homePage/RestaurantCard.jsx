import React, { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import Chip from '@mui/material/Chip';
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addToFavorite } from "../../state/authentication/Action";

const RestaurantCard = ({ item }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

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
            if (!prev) {
                dispatch(addToFavorite({ restaurantId: item.id, jwt }));
            }
            return !prev;
        });
    }, [item, getFavorites, dispatch, jwt]);

    const handleCardClick = () => {
        const encodedCity = encodeURIComponent(item.address?.city || "Unknown City");
        const encodedName = encodeURIComponent(item.name || "Unnamed Restaurant");
        navigate(`/restaurant/${encodedCity}/${encodedName}/${item.id}`);
    };

    if (!item || !item.name) {
        return <div className="m-5">Restaurant not found</div>;
    }

    return (
        <Card
            className="m-5 w-[18rem] productCard hover:shadow-lg transition-shadow duration-300"
            onClick={handleCardClick}
        >
            <img
                className="w-full h-[10rem] rounded-t-md object-cover"
                src={item.images[0] || "https://via.placeholder.com/150"}
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
                    <p className="font-semibold text-lg cursor-pointer">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                        {item.description?.length > 40 ? `${item.description.substring(0, 40)}...` : item.description || "No description available."}
                    </p>
                </div>
                <IconButton onClick={toggleFavorite} aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}>
                    {isFavorite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                </IconButton>
            </div>
        </Card>
    );
};

RestaurantCard.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.shape({
            city: PropTypes.string, // Optional
        }),
        imageUrl: PropTypes.string, // Now optional
        description: PropTypes.string, // Now optional
        open: PropTypes.bool.isRequired,
    }).isRequired,
};

export default RestaurantCard;
