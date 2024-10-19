import React, { Fragment, useState } from "react";
import CatItem from "./CatItem";
import AddressCard from "./AddressCard";
import {
  Divider, Card, Button, Modal, Box, TextField, Grid,
} from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";

const cartItems = [1,1,1,1];
const addresses = [1,1,1,1,1];

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

const Cart = () => {
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const createOrderSelectedAddress = () => {
    console.log("Order created with selected address");
  };

  const handleOpenAddressModal = () => {
    setOpenAddressModal(true);
  };

  const handleCloseAddressModal = () => {
    setOpenAddressModal(false);
  };

  const handleSubmit = (values) => {
    console.log("Form submitted", values);
    handleCloseAddressModal();
  };

  return (
    <Fragment>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 min-h-screen pt-10">
          <div className="space-y-6">
            {cartItems.map((_, index) => (
              <CatItem key={index} />
            ))}
          </div>
          <Divider />

          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              {Array(4)
                .fill(null)
                .map((_, idx) => (
                  <div key={idx} className="flex justify-between text-gray-400">
                    <p>Item Total</p>
                    <p>800</p>
                  </div>
                ))}
              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Total Payable</p>
                <p>4500</p>
              </div>
            </div>
          </div>
        </section>

        <Divider orientation="vertical" flexItem />

        <section className="lg:w-[70%] px-5">
          <h1 className="text-center font-semibold text-2xl py-10">
            Choose Delivery Address
          </h1>

          <div className="flex flex-wrap justify-between">
            {addresses.map((_, index) => (
              <AddressCard
                key={index}
                showButton={true}
                handleSelectAddress={createOrderSelectedAddress}
              />
            ))}

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

      <Modal open={openAddressModal} onClose={handleCloseAddressModal}>
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      name="streetAddress"
                      as={TextField}
                      label="Street Address"
                      fullWidth
                      variant="outlined"
                      error={touched.streetAddress && !!errors.streetAddress}
                      helperText={
                        <ErrorMessage name="streetAddress" component="span" className="text-red-600" />
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="city"
                      as={TextField}
                      label="City"
                      fullWidth
                      variant="outlined"
                      error={touched.city && !!errors.city}
                      helperText={
                        <ErrorMessage name="city" component="span" className="text-red-600" />
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="state"
                      as={TextField}
                      label="State"
                      fullWidth
                      variant="outlined"
                      error={touched.state && !!errors.state}
                      helperText={
                        <ErrorMessage name="state" component="span" className="text-red-600" />
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Field
                      name="pincode"
                      as={TextField}
                      label="Pincode"
                      fullWidth
                      variant="outlined"
                      error={touched.pincode && !!errors.pincode}
                      helperText={
                        <ErrorMessage name="pincode" component="span" className="text-red-600" />
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained">
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
