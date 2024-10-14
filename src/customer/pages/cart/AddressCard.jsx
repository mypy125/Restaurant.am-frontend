import { Card, Button } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import React from "react";

const AddressCard = ({handleSelectAddress, item, showButton}) => {

    return (
        <Card className="flex space-x-5 lg:w-64 m-5 p-5">
            <HomeIcon />
            <div className="space-y-3 text-gray-400">
                <h1 className="font-semibold text-lg text-white">Home</h1>
                <p>Main St, City, Country</p>

                {showButton && (
                    <Button 
                        variant="outlined" 
                        fullWidth 
                        onClick={handleSelectAddress(item)}
                    >
                        Select
                    </Button>
                )}
            </div>
        </Card>
    );
};

export default AddressCard;
