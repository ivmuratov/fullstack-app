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
    button: {
        textTransform: 'none',
        color: "inherit",
        fontSize: "1.15rem"
    },    
    accountIconButton: {
        color: "inherit",
        position: "absolute",
        right: "50px"
    },
    loginButton: {
        textTransform: 'none',
        color: "inherit",
        position: "absolute",
        right: "20px",
        fontSize: "1.15rem"
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
                <Button className={classes.button} onClick={() => navigate('/')}>Home</Button>
                {isAdmin() && <Button className={classes.button} onClick={() => navigate('/user')}>Users</Button>}
                {auth && <IconButton className={classes.accountIconButton} onClick={() => navigate('/account')}><AccountBoxIcon /></IconButton>}
                {!auth && <Button className={classes.loginButton} onClick={() => navigate('/login')}>Sign In/Up</Button>}                
                {auth && <LogoutButton />}
            </Toolbar>
        </AppBar>
    );
}

export default HeaderComponent;