import React from "react";
import '../App.css';
import { FormGroup, TextField, Button, makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import { green } from "@material-ui/core/colors";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { login } from "../service/connectToSpringBoot";
import AlertInfo from './AlertInfo';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContextProvider';
import NotFoundComponent from './NotFoundComponent';
import { NavLink } from "react-router-dom";


const useStyles = makeStyles(theme => ({
    container: {
        width: '25%',
        margin: '10% auto 27% auto'
    },
    link: {
        marginTop: '50px',
    },
    button: {
        marginTop: '15px',
        textTransform: 'none',
        fontSize: "1rem",
    },
}));

const styleNavLink = {
    marginTop: '35px',
    display: 'inline-block'
}

const theme = createTheme({
    palette: {
        primary: green,
    },
});

const initCredentials = {
    email: '',
    password: ''
};

const LoginComponent = () => {

    const classes = useStyles();

    const navigate = useNavigate();

    const [openAlert, setOpenAlert] = useState(false);

    const [alert, setAlert] = useState({
        severity: 'success',
        title: '',
        content: ''
    });

    const { severity, title, content } = alert;

    const { control, handleSubmit } = useForm({ defaultValues: initCredentials });

    const { auth, setAuth } = useAuthContext();

    const onSubmit = req => {
        login(req)
            .then(resp => {
                console.log('login:');
                console.log(resp);
                localStorage.setItem('username', req.email);
                localStorage.setItem('password', req.password);
                localStorage.setItem('roles', resp.data.roles);
                navigate("/");
                setAuth(true);
            })
            .catch(err => {
                console.log('login failed:');
                console.log(err.response);
                handleOpenAlert();
                setAlert({
                    severity: 'error',
                    title: 'LOGIN FAILED!',
                    content: 'Incorrect email or password'
                });
            });
    }

    const handleOpenAlert = () => {
        setOpenAlert(true);
    }

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }

    return auth ? <NotFoundComponent />
        : (
            <FormGroup className={classes.container}>
                <AlertInfo open={openAlert}
                    close={handleCloseAlert}
                    severity={severity}
                    title={title}
                    content={content} />
                <h4>Login</h4>
                <br />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => {
                            return (openAlert
                                ? <TextField label="Email"
                                    type="email"
                                    fullWidth
                                    error
                                    {...field} />
                                : <TextField label="Email"
                                    type="email"
                                    fullWidth
                                    {...field} />);
                        }} />

                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => {
                            return (openAlert
                                ? <TextField label="Password"
                                    type="password"
                                    fullWidth
                                    error
                                    helperText="Incorrect email or password"
                                    {...field} />
                                : <TextField label="Password"
                                    type="password"
                                    fullWidth
                                    {...field} />);
                        }} />

                    <NavLink to="/registration" style={styleNavLink}>
                        If you don't have an account, please register.
                    </NavLink>
                    <ThemeProvider theme={theme}>
                        <Button className={classes.button}
                            color="primary"
                            type="submit"
                            variant="contained"
                            fullWidth >
                            Sign In
                        </Button>
                    </ThemeProvider>
                </form>
            </FormGroup>
        );
}

export default LoginComponent;