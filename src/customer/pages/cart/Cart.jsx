import React, { Fragment, useState } from "react";
import CatItem from "./CatItem";
import AddressCard from "./AddressCard";
import {
  Divider, Card, Button, Modal, Box, TextField, Grid,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { ErrorMessage, Field, Form, Formik } from "formik";
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
  state: "",
  pincode: "",
  city: "",
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string().required("Street Address is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.number()
    .typeError("Pincode must be a number")
    .required("Pincode is required"),
});

const addresses = [1,1,1,1,1];

const Cart = () => {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null); 

  const { auth, cart, addresses } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleSelectAddress = (address) => {
    setSelectedAddress(address); 
    console.log("Selected address:", address);
  };

  const handleOpenAddressModal = () => {
    setOpenAddressModal(true);
  };

  const handleCloseAddressModal = () => {
    setOpenAddressModal(false);
  };

  const handleSubmit = (values) => {
    const restaurantId = cart.cartItems && cart.cartItems.length > 0 ? cart.cartItems[0].food?.restaurant.id : null;
    const fullName = auth.user ? auth.user.fullName : "Guest"; 

    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: restaurantId,
        deliveryAddress: {
          fullName: fullName,
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          postalCode: values.pincode,
          country: "Armenia", 
        },
      },
    };
    dispatch(createOrder(data)); 
    console.log("Form submitted with values:", values);
    handleCloseAddressModal();
  };

  return (
    <Fragment>
      <main className="lg:flex justify-between">
        {/* Cart items section */}
        <section className="lg:w-[30%] space-y-6 min-h-screen pt-10">
          <div className="space-y-6">
            {cart.cartItems && cart.cartItems.length > 0 ? (
              cart.cartItems.map((item) => (
                <CatItem key={item.id} item={item} />
              ))
            ) : (
              <p>No items in cart</p>
            )}
          </div>
          <Divider />
          {/* Bill details */}
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>{cart.cart?.total}</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Total Payable</p>
                <p>{cart.cart?.total + 33 + 21}</p>
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
            {Array.isArray(addresses) && addresses.length > 0 ? (
              addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  item={address}
                  showButton={true}
                  handleSelectAddress={() => handleSelectAddress(address)}
                />
              ))
            ) : (
              <p>No addresses available</p>
            )}

            {/* Button to add new address */}
            <Card className="flex space-x-5 lg:w-64 m-5 p-5">
              <AddLocationAltIcon />
              <div className="space-y-3 text-gray-400">
                <p>Add New Address</p>
                <Button
                  onClick={handleOpenAddressModal}
                  fullWidth
                  variant="contained"
                  sx={{ padding: ".75rem" }}
                >
                  Add
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Modal for adding new address */}
      <Modal open={openAddressModal} onClose={handleCloseAddressModal}>
      <Box sx={style}>
        <Formik
          initialValues={{
            street: "",
            city: "",
            state: "",
            pincode: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form submitted:", values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Grid container spacing={2}>
                {/* Street Address Field */}
                <Grid item xs={12}>
                  <Field
                    name="street"
                    as={TextField}
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    error={touched.street && Boolean(errors.street)}
                    helperText={touched.street && errors.street}
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
                    name="state"
                    as={TextField}
                    label="State"
                    fullWidth
                    variant="outlined"
                    error={touched.state && Boolean(errors.state)}
                    helperText={touched.state && errors.state}
                  />
                </Grid>

                {/* Pincode Field */}
                <Grid item xs={12}>
                  <Field
                    name="pincode"
                    as={TextField}
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                    error={touched.pincode && Boolean(errors.pincode)}
                    helperText={touched.pincode && errors.pincode}
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
    </Fragment>
  );
};

export default Cart;
