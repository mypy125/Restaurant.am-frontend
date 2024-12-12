import React, { useEffect } from "react";
import {
  Modal, Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Button
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientOfRestaurant, updateStockOfIngredient } from "../../customer/state/ingredients/Action";

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

export const IngredientTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { restaurant, ingredients } = useSelector((store) => store);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (jwt && restaurant.userRestaurant.id) {
      dispatch(getIngredientOfRestaurant({ jwt, id: restaurant.userRestaurant.id }));
    }
  }, [jwt, restaurant.userRestaurant.id, dispatch])

  const handleUpdateStock = (id) => {
    dispatch(updateStockOfIngredient({ id, jwt }));
  };

  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title="Ingredients"
          sx={{ pt: 2, textAlign: "center" }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients?.ingredients.length > 0 ? (
                ingredients.ingredients.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell component="th" scope="row">{item.id}</TableCell>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="left">{item.category ? item.category.name : 'No category'}</TableCell>
                    <TableCell align="left">
                      <Button onClick={() => handleUpdateStock(item.id)}>
                        {item.inStoke ? "In stock" : "Out of stock"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No Ingredients found
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
          <CreateIngredientForm />
        </Box>
      </Modal>
    </Box>
  );
};
