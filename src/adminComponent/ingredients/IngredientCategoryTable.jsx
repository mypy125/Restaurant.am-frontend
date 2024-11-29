import React, { useEffect } from "react";
import {
  Modal, Box, Card, CardHeader,Table,TableBody,TableCell,TableContainer,
  TableHead,TableRow, Paper, IconButton,
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import CreateIngredientCategoryForm from "./CreateIngredientCategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientCategory } from "../../customer/state/ingredients/Action";
import CreateIngredientForm from "./CreateIngredientForm";

const ingredientCategory = [1,1,1,1,1];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const IngredientCategoryTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const {restaurant,ingredients} = useSelector((store)=> store)


  const jwt = localStorage.getItem("jwt");

  useEffect(()=> {
    if (restaurant.userRestaurant?.id && jwt) {
      dispatch(getIngredientCategory({id:restaurant.userRestaurant.id,jwt}))
    }
  },[restaurant.userRestaurant?.id, jwt, dispatch])


  return (
    <Box>
      <Card sx={{ mt: 1 }}>
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title={"Ingredient Category"}
          sx={{ pt: 2, textAlign: "center" }}
        />
        <TableContainer component={Paper}>
          <Table aria-label="ingredient categories table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients?.category && ingredients.category.length > 0 ? (
                ingredients.category.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="right">{item.name}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No categories found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateIngredientCategoryForm />
        </Box>
      </Modal>
    </Box>
  );
};
