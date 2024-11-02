import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../state/authentication/Action";

const initialValues = {
    email: "",
    password: "" 
};

const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        dispatch(loginUser({ userData: values, navigate }));
    };

    return (
        <div>
            <Typography variant="h5" className="text-center">
                Login
            </Typography>

            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form>
                        <Field
                            name="email"
                            as={TextField}
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        <Field
                            name="password" 
                            as={TextField}
                            label="Password"
                            type="password" 
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        <Button
                            sx={{ mt: 2, padding: "1rem" }}
                            fullWidth
                            type="submit"
                            variant="contained"
                        >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>

            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don't have an account?
            </Typography>
            <Button size="small" onClick={() => navigate("/account/register")}>
                Register
            </Button>
        </div>
    );
};

export default LoginForm;
