import React, { useEffect } from "react";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Avatar,
  Chip,
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteFoodAction, getMenuItemsByRestaurantId } from "../../customer/state/menu/Action";

export const MenuTable = () => {
  const dispatch = useDispatch();
  const { restaurant, ingredients} = useSelector((store) => store);
  const { menu } = useSelector((store) => store.menu || { menuItems: [] });
  const menuItems = menu?.menuItems || [];
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  

  useEffect(() => {
    if (jwt && restaurant.userRestaurant.id) {
      dispatch(getMenuItemsByRestaurantId({
        jwt,
        restaurantId: restaurant.userRestaurant?.id,
        vegetarian: false,
        seasonal: false,
        nonveg: false,
        foodCategory: ""
      }));
    }
  }, []);

  useEffect(() => {
    console.log("Store content:", menu);
  }, [menu]);

  const handleDeleteFood = (foodId) => {
    dispatch(deleteFoodAction({foodId, jwt}))
  }

  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={() => navigate("/admin/restaurants/add-menu")} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title={"Menu"}
          sx={{ pt: 2, textAlign: "center" }}
        />
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">image</TableCell>
                <TableCell align="right">title</TableCell>
                <TableCell align="right">ingredients</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">availability</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {menu?.menuItems?.length > 0 ? (
               menu.menuItems.map((item) => (
                 <TableRow key={item.id}>
                   <TableCell>
                     <Avatar src={item.images?.[0]} />
                   </TableCell>
                   <TableCell>{item.name}</TableCell>
                   <TableCell>
                     {item.ingredients?.map((ingredient) => (
                       <Chip key={ingredient.id} label={ingredient.name} />
                     ))}
                   </TableCell>
                   <TableCell>֏{item.price}</TableCell>
                   <TableCell>{item.available ? "In_stock" : "Out_of_stock"}</TableCell>
                   <TableCell>
                     <IconButton onClick={() => handleDeleteFood(item.id)}>
                       <Delete />
                     </IconButton>
                   </TableCell>
                 </TableRow>
               ))
             ) : (
               <TableRow>
                 <TableCell colSpan={6} align="center">
                   No menu found
                 </TableCell>
               </TableRow>
             )}
            </TableBody>            
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};