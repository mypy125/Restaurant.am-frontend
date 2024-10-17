import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import "./Navbar.css";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const handleLogOut = () => {
        console.log("handle log out");
        navigate("/login");
    };

    return (
        <Box 
            className="px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between items-center"
        >
            <div 
                className="cursor-pointer flex items-center space-x-4"
                onClick={() => navigate("/")}
            >
                <span className="logo font-semibold text-gray-300 text-2xl">
                    Taco Food
                </span>
            </div>

            <div className="flex items-center space-x-2">
                <IconButton aria-label="Search">
                    <SearchIcon sx={{ fontSize: "1.5rem" }} />
                </IconButton>

                <span
                    id="basic-button"
                    aria-controls={openMenu ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? 'true' : undefined}
                    onClick={handleOpenMenu}
                    className="font-semibold cursor-pointer"
                >
                    Gor Mkhitaryan
                </span>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => navigate("/my-profile")}>Profile</MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>

                <IconButton 
                    aria-label="Cart"
                    onClick={() => navigate("/cart")}
                >
                    <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
                </IconButton>
            </div>
        </Box>
    );
};

export default Navbar;
