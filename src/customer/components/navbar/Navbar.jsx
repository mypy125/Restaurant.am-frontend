import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Badge, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import "./Navbar.css";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);
    const navigate = useNavigate();
    
    const { auth, cart } = useSelector((store) => store) || {}; 
    const user = auth?.user || {}; 

    const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const handleAvatarClick = () => {
        navigate(user.role === "CUSTOMER" ? "/my-profile" : "/admin/restaurant");
    };

    const handleLogOut = () => {
        console.log("handle log out");
        navigate("/login");
    };

    const cartItemsCount = cart?.cart?.items?.length || 0;

    return (
        <Box
            className="px-5 sticky top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between items-center"
        >
            <div
                className="cursor-pointer flex items-center space-x-4"
                onClick={() => navigate("/")}
            >
                <Typography variant="h6" className="logo font-semibold text-gray-300">
                    Restaurant.am
                </Typography>
            </div>

            <div className="flex items-center space-x-2">
                <IconButton aria-label="Search">
                    <SearchIcon sx={{ fontSize: "1.5rem" }} />
                </IconButton>

                {user.fullname ? (
                    <Avatar
                        onClick={handleAvatarClick}
                        sx={{ bgcolor: "white", color: pink.A400 }}
                    >
                        {user.fullname[0]?.toUpperCase() || "?"}
                    </Avatar>
                ) : (
                    <IconButton
                        aria-label="Profile"
                        onClick={() => navigate("/account/login")}
                    >
                        <PersonIcon sx={{ fontSize: "1.5rem" }} />
                    </IconButton>
                )}

                <span
                    id="basic-button"
                    aria-controls={openMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                    onClick={handleOpenMenu}
                    className="font-semibold cursor-pointer"
                    tabIndex={0} 
                    role="button"
                >
                    {user.fullname || "Profile"}
                </span>

                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleCloseMenu}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem onClick={() => { handleCloseMenu(); navigate("/my-profile"); }}>
                        Profile
                    </MenuItem>
                    <MenuItem onClick={() => { handleCloseMenu(); handleLogOut(); }}>Logout</MenuItem>
                </Menu>

                <IconButton onClick={()=> navigate("/cart")}>
                    <Badge color="primary" badgeContent={cartItemsCount}>
                        <ShoppingCartIcon sx={{ fontSize: "1.5rem" }} />
                    </Badge>
                </IconButton>
            </div>
        </Box>
    );
};

export default Navbar;
