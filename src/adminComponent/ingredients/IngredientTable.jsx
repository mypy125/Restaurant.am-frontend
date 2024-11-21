import React, { useEffect } from "react";
import {
  Modal, Box, Card, CardHeader, Table,TableBody, TableCell, TableContainer,
  TableHead, TableRow,Paper,IconButton,
  Button,
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import CreateIngredientForm from "./CreateIngredientForm";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientOfRestaurant, updateStockOfIngredient } from "../../customer/state/ingredients/Action";

const menu = [1,1,1,1,1];

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
  const {restaurant,ingredients} = useSelector(store => store)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(()=> {
    if (jwt && restaurant.userRestaurant.id) {
      dispatch(getIngredientOfRestaurant({jwt,id:restaurant.userRestaurant.id}))
    }
  },[jwt, restaurant.userRestaurant.id, dispatch])

  const handleUpdateStoke = (id) => {
    dispatch(updateStockOfIngredient({id,jwt}))
  }

  return (
    <Box>
      <Card>
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title={"Ingredients"}
          sx={{ pt: 2, textAlign: "center" }}
        />
        
        <TableContainer component={Paper}>
          <Table sx={{ minWidth:650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Availableti</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients?.ingredients?.length > 0 ? (
                ingredients.ingredients.map((item) => (
                  <TableRow
                    key={item.id || item.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{item.id}</TableCell>
                    <TableCell align="left">{item.name}</TableCell>
                    <TableCell align="right">{item.category.name}</TableCell>
                    <TableCell align="right">
                      <Button onClick={()=> handleUpdateStoke(item.id)}>{item.inStoke ? "in_stoke" : "out_of_stoke"}</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No Ingredient found
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
              <CreateIngredientForm/>
        </Box>
      </Modal>
    </Box>
  );
};
