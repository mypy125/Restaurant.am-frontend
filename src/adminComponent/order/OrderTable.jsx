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
  AvatarGroup,
  Avatar,
  Chip,
  Menu,
  Button,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRestaurantsOrder, updateOrderStatus } from "../../customer/state/restaurantOrder/Action";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Out For Delivery", value: "OUT_OF_DELIVERY" },
  { label: "Delivered", value: "DELIVERED" }
];

export const OrderTable = () => {
  const dispatch = useDispatch();
  const { restaurant, ingredients,restaurantOrder, menu } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(()=> {
    dispatch(fetchRestaurantsOrder({
      jwt,
      restaurantId: restaurant.userRestaurant?.id
    }))

  },[])

  const handleUpdateOrder = (orderId,orderStatus) => {
    dispatch(updateOrderStatus({orderId,orderStatus,jwt}))
    handleClose();
  }
  

  return (
    <Box>
      <Card>
        <CardHeader title={"All Orders"} sx={{ pt: 2, textAlign: "center" }} />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>id</TableCell>
                <TableCell align="right">image</TableCell>
                <TableCell align="right">customer</TableCell>
                <TableCell align="right">price</TableCell>
                <TableCell align="right">name</TableCell>
                <TableCell align="right">ingredients</TableCell>
                <TableCell align="right">status</TableCell>
                <TableCell align="right">update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder?.orders.length > 0 ? (
                restaurantOrder.orders.map((item) => (
                  <TableRow
                    key={item.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell align="right">
                      <AvatarGroup>
                          {item.items.map((orderItem)=> <Avatar src={orderItem.food?.images[0]}/>)}
                       
                      </AvatarGroup>
                    </TableCell>
                    <TableCell align="right">
                      {item.customer?.fullName}
                    </TableCell>
                    <TableCell align="right">֏{item.totalAmount}</TableCell>
                    <TableCell align="right">
                      {item.items.map((orderItem)=><p>{orderItem.food?.name}</p>)}
                    </TableCell>
                    <TableCell align="right">
                    {item.ingredients.map((orderItem)=>
                    <div>
                      {orderItem.ingredients.map((ingredient)=> <Chip label={ingredient}/>)}
                    </div>
                   )}
                    </TableCell>
                    <TableCell align="right">{item.orderStatus}</TableCell>
                    <TableCell align="right">
                       <Button
                         id="basic-button"
                         aria-controls={open ? 'basic-menu' : undefined}
                         aria-haspopup="true"
                         aria-expanded={open ? 'true' : undefined}
                         onClick={handleClick}
                       >
                         Update
                       </Button>
                       <Menu
                         id="basic-menu"
                         anchorEl={anchorEl}
                         open={open}
                         onClose={handleClose}
                         MenuListProps={{
                           'aria-labelledby': 'basic-button',
                         }}
                       >
                         {orderStatus.map((status)=>
                         <MenuItem onClick={()=>handleUpdateOrder(item.id,status.value)}>{status.label}</MenuItem>)}
                       </Menu>
                    </TableCell>
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
