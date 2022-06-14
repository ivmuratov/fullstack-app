import React from "react";
import { AppBar, makeStyles, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";
import { isAdmin } from "../util/authUtil";
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LogoutButton from './LogoutButton';

const useStyles = makeStyles({
    header: {
        background: '#053acfde'
    },
    tabs: {
        color: '#FFFFFF',
        textDecoration: 'none',
        marginLeft: 20,
        fontSize: 20
    },
    accountButton: {
        color: "inherit",
        position: "absolute",
        left: "93%"
    }
});

const HeaderComponent = () => {

    const classes = useStyles();

    const navigate = useNavigate();

    const { auth } = useAuthContext();

    return (
        <AppBar className={classes.header}>
            <Toolbar>
                <Typography varinat='h6'>Test React.js</Typography>
                <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
                {isAdmin() && <Button color="inherit" onClick={() => navigate('/user')}>Users</Button>}
                {auth && <IconButton className={classes.accountButton} onClick={() => navigate('/account')}><AccountBoxIcon /></IconButton>}
                {!auth && <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>}
                {!auth && <Button color="inherit" onClick={() => navigate('/registration')}>Registration</Button>}
                {auth && <LogoutButton />}
            </Toolbar>
        </AppBar>
    );
}

export default HeaderComponent;