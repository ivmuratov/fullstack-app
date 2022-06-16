import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuthContext } from "../context/AuthContextProvider";

const useStyles = makeStyles(theme => ({
    logoutButton: {
        position: "absolute",
        right: "20px",
        color: theme.palette.secondary.main
    }
}));

const LogoutButton = () => {

    const classes = useStyles();

    const navigate = useNavigate();

    const { setAuth } = useAuthContext();

    const onLogout = () => {
        console.log('logout')
        localStorage.clear();
        navigate("/");
        setAuth(false);
    }

    return (
        <IconButton className={classes.logoutButton}
            onClick={onLogout}>
            <ExitToAppIcon />
        </IconButton>
    );
}

export default LogoutButton;