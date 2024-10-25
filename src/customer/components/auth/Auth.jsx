import { Box, Modal } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { style } from "../../pages/cart/Cart";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const Auth = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleOnClose = () => {
        navigate("/");
    };

    const isRegisterPage = location.pathname === "/account/register";
    const isLoginPage = location.pathname === "/account/login";
    const isModalOpen = isRegisterPage || isLoginPage;

    return (
        <Modal
            onClose={handleOnClose}
            open={isModalOpen}
            aria-labelledby="auth-modal-title"
            aria-describedby="auth-modal-description"
        >
            <Box sx={style}>
                {isRegisterPage ? <RegisterForm /> : <LoginForm />}
            </Box>
        </Modal>
    );
};

export default Auth;
