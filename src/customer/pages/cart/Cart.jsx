import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import AddressCard from "./AddressCard";
import { Divider, Card, Button, Modal, Box, TextField, Grid } from "@mui/material";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../state/order/Action";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  stateProvince: "",
  postalCode: '',
  city: "",
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  stateProvince: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.number()
    .typeError("Pincode must be a number")
    .required("Pincode is required"),
});

const Cart = () => {
  const { auth, cart } = useSelector((store)=>store)
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleClose = () => setOpen(false);
  const handleOpenAddressModal = () => setOpen(true);

  const createOrderUsingSelectedAddres = (address) => {
    setSelectedAddress(address); 
  };

  const [isLoading, setIsLoading] = useState(true);
  
  const handleSubmit = (values) => {
    if (isLoading) {
        console.log("Waiting for cart data to load...");
        return;
    }

    const restaurantId = cart.cartItems[0]?.food?.restaurant?.id;
    if (restaurantId) {
        const data = {
            restaurantId: restaurantId,
            deliveryAddress: {
                streetAddress: values.streetAddress,
                stateProvince: values.stateProvince,
                postalCode: values.postalCode, 
                city: values.city,
                country: "Armenia",
            },
        };
        dispatch(createOrder({ data, jwt, paymentMethod: "stripe" }));
        console.log("Form submitted with values-->>", data);
    } else {
        console.error("Restaurant ID is missing from the cart items.");
    }
  };

  const handleAddAddress = (values) => {
    dispatch(addAddress(values, jwt));
    handleClose();
  };
  
  return (
    <>
      <main className="lg:flex justify-between">
        {/* Cart items section */}
        <section className="lg:w-[30%] space-y-6 min-h-screen pt-10">
          {cart.cartItems?.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Divider />
          {/* Bill details */}
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>֏{cart.cart?.total}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Deliver Fee</p>
                <p>֏{cart.cart?.total}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>GST and Restaurant Charges</p>
                <p>֏{cart.cart?.total}</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Total Payable</p>
                <p>֏{cart.cart?.total + 33 + 21}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Address selection section */}
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] px-5">
          <h1 className="text-center font-semibold text-2xl py-10">
            Choose Delivery Address
          </h1>

          <div className="flex flex-wrap justify-between">
            {cart.addresses?.map((item, index) => (
              <AddressCard
                key={index}
                handleSelectAddress={createOrderUsingSelectedAddres}
                item={item}
                showButton={true}
              />
            ))}

            {/* Button to add new address */}
            <Card className="flex space-x-5 lg:w-64 m-5 p-5">
              <AddLocationAltIcon />
              <div className="space-y-3 text-gray-400">
                <h1 className="font-semibold text-lg text-white">Add New Address</h1>
                <p>Main St, City, Country</p>
                <Button variant="outlined" fullWidth onClick={handleOpenAddressModal}>
                  Add
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Modal for adding new address */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleAddAddress}
          >
            {({ touched, errors }) => (
              <Form>
                <Grid container spacing={2}>
                  {/* Street Address Field */}
                  <Grid item xs={12}>
                    <Field
                      name="streetAddress"
                      as={TextField}
                      label="Street Address"
                      fullWidth
                      variant="outlined"
                      error={touched.streetAddress && Boolean(errors.streetAddress)}
                      helperText={touched.streetAddress && errors.streetAddress}
                    />
                  </Grid>

                  {/* City Field */}
                  <Grid item xs={12}>
                    <Field
                      name="city"
                      as={TextField}
                      label="City"
                      fullWidth
                      variant="outlined"
                      error={touched.city && Boolean(errors.city)}
                      helperText={touched.city && errors.city}
                    />
                  </Grid>

                  {/* State Field */}
                  <Grid item xs={12}>
                    <Field
                      name="stateProvince"
                      as={TextField}
                      label="State"
                      fullWidth
                      variant="outlined"
                      error={touched.stateProvince && Boolean(errors.stateProvince)}
                      helperText={touched.stateProvince && errors.stateProvince}
                    />
                  </Grid>

                  {/* Pincode Field */}
                  <Grid item xs={12}>
                    <Field
                      name="postalCode"
                      as={TextField}
                      label="Pincode"
                      fullWidth
                      variant="outlined"
                      error={touched.postalCode && Boolean(errors.postalCode)}
                      helperText={touched.postalCode && errors.postalCode}
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth sx={{ marginTop: 2 }}>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;