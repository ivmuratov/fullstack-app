import React from "react";
import { IconButton, makeStyles } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuthContext } from "../context/AuthContextProvider";

const useStyles = makeStyles({
    logoutButton: {
        position: "absolute",
        left: "95%"
    }
});

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
        <IconButton className={classes.logoutButton} color="secondary"
            onClick={onLogout}>
            <ExitToAppIcon />
        </IconButton>
    );
}

export default LogoutButton;