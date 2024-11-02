import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Field as FormikField, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../state/authentication/Action";
import { useDispatch } from "react-redux";
import * as Yup from "yup"; 

const initialValues = {
    fullname: "",
    email: "",
    password: "",
    role: "CUSTOMER",
};

const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    role: Yup.string().required("Role is required"),
});

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values, { setSubmitting, setErrors }) => {
        dispatch(registerUser({ userData: values, navigate }))
            .catch((error) => {
                setErrors({ email: "Registration failed. Email may already be in use." });
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <div>
            <Typography variant="h5" align="center">Register</Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema} 
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors, touched }) => (  
                    <Form>
                        <FormikField
                            name="fullname"
                            as={TextField}
                            label="Full Name"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={Boolean(errors.fullname && touched.fullname)} 
                            helperText={touched.fullname ? errors.fullname : undefined}
                        />
                        <FormikField
                            name="email"
                            as={TextField}
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            error={Boolean(errors.email && touched.email)} 
                            helperText={touched.email ? errors.email : undefined}
                        />
                        <FormikField
                            name="password"
                            as={TextField}
                            label="Password"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type="password"
                            error={Boolean(errors.password && touched.password)} 
                            helperText={touched.password ? errors.password : undefined}
                        />
                        <FormikField
                            name="role"
                            as={Select}
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            error={Boolean(errors.role && touched.role)} 
                            defaultValue="CUSTOMER"
                        >
                            <MenuItem value="CUSTOMER">Customer</MenuItem>
                            <MenuItem value="OWNER">Owner</MenuItem>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                        </FormikField>
                        {errors.role && touched.role && (
                            <Typography color="error" variant="body2">{errors.role}</Typography>
                        )}
                        <Button
                            sx={{ mt: 2, padding: "1rem" }}
                            fullWidth
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Registering..." : "Register"}
                        </Button>
                    </Form>
                )}
            </Formik>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Already have an account?
            </Typography>
            <Button size="small" onClick={() => navigate("/account/login")}>Login</Button>
        </div>
    );
};

export default RegisterForm;
