import React from "react";
import '../App.css';
import { FormGroup, TextField, Button, makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import { green } from "@material-ui/core/colors";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { registration } from '../service/connectToSpringBoot';
import { useState } from 'react';
import AlertInfo from './AlertInfo';
import { useAuthContext } from '../context/AuthContextProvider';
import NotFoundComponent from './NotFoundComponent';

const useStyles = makeStyles({
    container: {
        width: '25%',
        margin: '10% auto 25% auto'
    },
    button: {
        marginTop: '35px',
        textTransform: 'none',
        fontSize: "1rem",
    },
});

const theme = createTheme({
    palette: {
        primary: green,
    },
});

const initCredentials = {
    name: "",
    email: "",
    password: ""
};

const RegistrationComponent = () => {

    const classes = useStyles();

    const navigate = useNavigate();

    const [openAlert, setOpenAlert] = useState(false);

    const [alert, setAlert] = useState({
        severity: 'success',
        title: '',
        content: ''
    });

    const { severity, title, content } = alert;

    const { auth, setAuth } = useAuthContext();

    const { control, formState: { errors }, handleSubmit } = useForm({ defaultValues: initCredentials });

    const onSubmit = req => {
        registration(req)
            .then(resp => {
                console.log('registration:');
                console.log(resp);
                localStorage.setItem('username', req.email);
                localStorage.setItem('password', req.password);
                localStorage.setItem('roles', resp.data.roles);
                navigate("/");
                setAuth(true);
            })
            .catch(err => {
                console.log("registration failed:");
                console.log(err.response);
                const errData = err.response.data;
                handleOpenAlert();
                setAlert({
                    severity: 'error',
                    title: `${errData.status}`,
                    content: `${errData.message}`
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
                <h4>Registration</h4>
                <br></br>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: { value: true, message: 'You must enter your Name' },
                            minLength: { value: 5, message: 'Your Name must be at least 5 chars' },
                            maxLength: { value: 20, message: 'Your Name must be no more than 20 chars' }
                        }}
                        render={({ field }) => {
                            return (errors.name || openAlert ?
                                <TextField label="Name"
                                    type="text"
                                    fullWidth
                                    error
                                    helperText={errors.name?.message}
                                    {...field} />

                                : <TextField label="Name"
                                    type="text"
                                    fullWidth
                                    {...field} />
                            );
                        }} />

                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: { value: true, message: 'You must enter your Email' },
                            minLength: { value: 5, message: 'Your Email must be at least 5 chars' },
                            maxLength: { value: 50, message: 'Your Email must be no more than 50 chars' }
                        }}
                        render={({ field }) => {
                            return (errors.email || openAlert ?
                                <TextField label="Email"
                                    type="email"
                                    fullWidth
                                    error
                                    helperText={errors.email?.message}
                                    {...field} />

                                : <TextField label="Email"
                                    type="email"
                                    fullWidth
                                    {...field} />
                            );
                        }} />

                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: { value: true, message: 'You must enter your Password' },
                            minLength: { value: 5, message: 'Your Password must be at least 5 chars' },
                            maxLength: { value: 20, message: 'Your Password must be no more than 20 chars' }
                        }}
                        render={({ field }) => {
                            return (errors.password || openAlert ?
                                <TextField label="Password"
                                    type="password"
                                    fullWidth
                                    error
                                    helperText={errors.password?.message}
                                    {...field} />

                                : <TextField label="Password"
                                    type="password"
                                    fullWidth
                                    {...field} />
                            );
                        }} />
                    <ThemeProvider theme={theme}>
                        <Button className={classes.button}
                            color="primary"
                            type="submit"
                            variant="contained"
                            fullWidth >
                            Sign Up
                        </Button>
                    </ThemeProvider>
                </form>
            </FormGroup>
        );
}

export default RegistrationComponent;