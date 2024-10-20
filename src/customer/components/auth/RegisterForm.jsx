import { Password } from "@mui/icons-material";
import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Field as FormikField, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../state/authentication/Action";
import { useDispatch } from "react-redux";

const initialValues = {
  fullname: "",
  email: "",
  password: "",
  role: "ROLE_CUSTOMER",
};

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log("Form values ", values);
    dispatch(registerUser({userData:values,navigate}))
  };

  return (
    <div>
      <Typography variant="h5" align="center">
        Register
      </Typography>

      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        {({ values, handleChange }) => (
          <Form>
            <FormikField
              name="fullname"
              as={TextField}
              label="Full Name"
              fullWidth
              variant="outlined"
              margin="normal"
            />

            <FormikField
              name="email"
              as={TextField}
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
            />

            <FormikField
              name="password"
              as={TextField}
              label="Password"
              fullWidth
              variant="outlined"
              margin="normal"
              type="password"
            />

            <FormikField
              name="role"
              as={Select}
              fullWidth
              margin="normal"
              variant="outlined"
              value={values.role}
              onChange={handleChange}
            >
              <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
              <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant_Owner</MenuItem>
            </FormikField>

            <Button
              sx={{mt:2, padding:"1rem"}}
              fullWidth
              type="submit"
              variant="contained"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>

      <Typography variant="body2" align="center" sx={{mt:3}}>
        Already have an account?
      </Typography>

      <Button size="small" onClick={() => navigate("/account/login")}>
        Login
      </Button>
    </div>
  );
};

export default RegisterForm;
