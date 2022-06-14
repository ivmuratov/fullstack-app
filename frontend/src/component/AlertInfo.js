import React from "react";
import { makeStyles, Snackbar } from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Markup } from 'interweave';

const useStyles = makeStyles({
    alert: {
        width: '25%',
        display: 'inline-block',
        marginTop: '50px'
    }
});

const position = {
    vertical: 'top',
    horizontal: 'right'
};

const AlertInfo = ({ open, close, severity, title, content }) => {

    const classes = useStyles();

    return (
        <Snackbar className={classes.alert}
            open={open}
            anchorOrigin={position}
            onClose={close}
            autoHideDuration={5000}>
            <Alert severity={severity}>
                <AlertTitle>{title}</AlertTitle>
                <Markup content={content} />
            </Alert>
        </Snackbar>
    );
}

export default AlertInfo;