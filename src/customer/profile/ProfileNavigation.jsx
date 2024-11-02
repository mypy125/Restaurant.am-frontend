import React from "react";
import { Divider, useMediaQuery, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../state/authentication/Action";
import {
    ShoppingBag as ShoppingBagIcon,
    Favorite as FavoriteIcon,
    AddReaction as AddReactionIcon,
    AccountBalanceWallet as AccountBalanceWalletIcon,
    NotificationsActive as NotificationsActiveIcon,
    Event as EventIcon,
    Logout as LogoutIcon,
} from '@mui/icons-material';

const menuItems = [
    { title: "Orders", icon: <ShoppingBagIcon />, path: "orders" },
    { title: "Favorites", icon: <FavoriteIcon />, path: "favorites" },
    { title: "Address", icon: <AddReactionIcon />, path: "address" },
    { title: "Payments", icon: <AccountBalanceWalletIcon />, path: "payments" },
    { title: "Notification", icon: <NotificationsActiveIcon />, path: "notification" },
    { title: "Events", icon: <EventIcon />, path: "events" },
    { title: "Logout", icon: <LogoutIcon />, path: "logout" },
];

const ProfileNavigation = ({ open, handleClose }) => {
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = (item) => {
        if (item.title === "Logout") {
            dispatch(logout());
            navigate("/");
        } else {
            navigate(`/my-profile/${item.title.toLowerCase()}`);
        }
    };

    return (
        <Drawer
            variant={isSmallScreen ? "temporary" : "permanent"}
            onClose={handleClose}
            open={isSmallScreen ? open : true}
            anchor="left"
            sx={{ zIndex: 1200 }}
        >
            <div className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8 pt-20">
                {menuItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <div 
                            onClick={() => handleNavigate(item)} 
                            className="px-5 flex items-center space-x-5 cursor-pointer"
                        >
                            {item.icon}
                            <span>{item.title}</span>
                        </div>
                        {index !== menuItems.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </div>
        </Drawer>
    );
};

export default ProfileNavigation;
