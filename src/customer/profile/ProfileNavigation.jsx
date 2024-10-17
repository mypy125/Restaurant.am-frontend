import React from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, useMediaQuery, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";

const menu = [
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

  const handleNavigate = (path) => {
    navigate(`/my-profile/${path}`);
  };

  return (
    <Drawer
      variant={isSmallScreen ? "temporary" : "permanent"}
      onClose={handleClose}
      open={isSmallScreen ? open : true}
      anchor="left"
      sx={{ zIndex: 1200 }}
    >
      <div
        className="w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col 
        justify-center text-xl gap-8 pt-20"
      >
        {menu.map((item, index) => (
          <React.Fragment key={index}>
            <div 
              onClick={() => handleNavigate(item.path)} 
              className="px-5 flex items-center space-x-5 cursor-pointer"
            >
              {item.icon}
              <span>{item.title}</span>
            </div>
            {index !== menu.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </div>
    </Drawer>
  );
};

export default ProfileNavigation;