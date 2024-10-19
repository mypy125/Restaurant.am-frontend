import { Password } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";

const initialValues={
    email:"",
    Password:""
}
const LoginForm = () => {
    const navigate = useNavigate();
    const handleSubmit = () => {

    }

    return (
     <div>
        <Typography variant="h5" className="text-center">
            Login
        </Typography>

        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            <Form>

                <Field
                    name="email"
                    as={TextField}
                    label="email:"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                />
                  <Field
                    name="password"
                    as={TextField}
                    label="password:"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                />
                <Button sx={{mt:2, padding:"1rem"}}
                fullWidth
                type="submit"
                variant="contained">Login</Button>

            </Form>

        </Formik>

        <Typography variant="body2" align="center" sx={{mt:3}}>
            Dont have account?
        </Typography>
        <Button size="small" onClick={()=> navigate("/account/register")}>
            register
        </Button>

     </div>
    );
};

export default LoginForm;