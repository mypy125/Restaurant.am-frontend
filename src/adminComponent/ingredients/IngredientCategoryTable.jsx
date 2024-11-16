import React from "react";
import {
  Modal, Box, Card, CardHeader,Table,TableBody,TableCell,TableContainer,
  TableHead,TableRow, Paper, IconButton,
} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import CreateIngredientCategoryForm from "./CreateIngredientCategoryForm";

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

  return (
    <Box>
      <Card className="mt-1">
        <CardHeader 
        action={
          <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon/>
          </IconButton>
        } title={"Ingredient Category"} 
        sx={{ pt: 2, textAlign: "center" }} />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">name</TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredientCategory.length > 0 ? (
                ingredientCategory.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {1}
                    </TableCell>
                    <TableCell align="right">{"name"}</TableCell>
                   
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No orders found
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
            <CreateIngredientCategoryForm/>
        </Box>
      </Modal>
    </Box>
  );
};
