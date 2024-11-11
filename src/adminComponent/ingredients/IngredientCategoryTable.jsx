import React from "react";
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
} from "@mui/material";

const ingredientCategory = [1,1,1,1,1];

export const IngredientCategoryTable = () => {
  return (
    <Box>
      <Card>
        <CardHeader title={"Ingredient Category"} 
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
    </Box>
  );
};
