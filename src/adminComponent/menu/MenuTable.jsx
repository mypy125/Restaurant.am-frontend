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
  const { restaurant, ingredients, menu } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt && restaurant.userRestaurant.id) {
      dispatch(getMenuItemsByRestaurantId({
        jwt,
        restaurantId: restaurant.userRestaurant.id,
        vegetarian: false,
        seasonal: false,
        nonveg: false,
        foodCategory: ""
      }));
    }
  }, []);

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
                <TableCell align="left">Image</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Ingredients</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Avialabllity</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.length > 0 ? (
                menu.menuItems.map((item) => (
                  <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row"><Avatar src={item.images[0]}></Avatar></TableCell>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="right">
                      {item.ingredients.map((ingredient)=><Chip label={ingredient.name}/>)}
                    </TableCell>
                    <TableCell align="right">֏{item.price}</TableCell>
                    <TableCell align="right">{item.available ? "in_stoke" : "out_of_stoke"}</TableCell>
                    <TableCell align="right">
                      <IconButton color="primary" onClick={()=> handleDeleteFood(item.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
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