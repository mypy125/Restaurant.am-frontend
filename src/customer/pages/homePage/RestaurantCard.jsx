import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const RestaurantCard = ({item={},index=0}) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isFavorited = favorites.some(fav => fav.name === item.name);
        setIsFavorite(isFavorited);
    }, [item]);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);

        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (isFavorite) {
            const updatedFavorites = favorites.filter(fav => fav.name !== item.name);
            localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        } else {
            favorites.push(item);
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
    };

    if (!item.name) {
        return <div className="m-5">Item not found</div>;
    }

    const handleCardClick = () => {
        const encodedCity = encodeURIComponent(item.city || "");
        const encodedName = encodeURIComponent(item.name || "");
        navigate(`/restaurant/${encodedCity}/${encodedName}/${index+1}`);
    };

    return (
        <Card className="m-5 w-[18rem] productCard">
            <div 
            onClick={handleCardClick}
            >
                <img
                    className="w-full h-[10rem] rounded-t-md object-cover"
                    src={item.imageUrl}
                    alt={item.name || "Restaurant Image"}
                />
            </div>
            <div className="p-4 textPart lg:flex w-full justify-between">
                <div className="space-y-1">
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                        {item.description.length > 40
                            ? item.description.substring(0, 40) + "..."
                            : item.description}
                    </p>
                </div>
                <div>
                    <IconButton onClick={toggleFavorite}>
                        {isFavorite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon />}
                    </IconButton>
                </div>
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
    }),
    index: PropTypes.number.isRequired,
};

RestaurantCard.defaultProps = {
    item: {
        name: "Unknown Restaurant",
        city: "Unknown City",
        imageUrl: "https://via.placeholder.com/150",
        description: "No description available.",
    },
    index: 0,
};

export default RestaurantCard;