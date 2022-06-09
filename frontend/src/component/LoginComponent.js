import '../App.css';
import { FormGroup, TextField, Button, makeStyles } from '@material-ui/core';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { login } from "../service/connectToSpringBoot";
import AlertComponent from './AlertComponent';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContextProvider';
import NotFoundComponent from './NotFoundComponent';

const useStyles = makeStyles({
    container: {
        width: '25%',
        margin: '10% auto 27% auto'
    },
    button: {
        width: '80px',
        marginTop: '10px',
        marginRight: '7px'
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

    const { control, handleSubmit, reset } = useForm({ defaultValues: initCredentials });

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

    const resetForm = () => {
        reset(initCredentials);
    }

    const handleCancel = () => {
        navigate("/");
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
                <AlertComponent open={openAlert}
                    close={handleCloseAlert}
                    severity={severity}
                    title={title}
                    content={content} />
                <h4>Login</h4>
                <br></br>
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

                    <Button className={classes.button}
                        color="primary"
                        type="submit"
                        variant="contained">
                        Confirm
                    </Button>
                    <Button className={classes.button}
                        color="default"
                        variant="contained"
                        onClick={resetForm}>
                        Reset
                    </Button>
                    <Button className={classes.button}
                        color="secondary"
                        variant="contained"
                        onClick={handleCancel}>
                        Cancel
                    </Button>
                </form>
            </FormGroup>
        );
}

export default LoginComponent;