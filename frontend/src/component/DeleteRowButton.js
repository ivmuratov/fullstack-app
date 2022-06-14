import React from "react";
import { getAuthUser } from "../util/authUtil";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";

const DeleteRowButton = ({ id, nameValue, handleOpenAlert, setAlert, deleteFunc, updateTable }) => {

    const { username, password } = getAuthUser();

    const deleteRow = id => {
        if (!window.confirm(`Are you sure you want to delete the ${nameValue} by id - ${id}?`)) {
            return;
        }

        deleteFunc(id, username, password)
            .then(resp => {
                console.log('deleteRow:');
                console.log(resp);
                handleOpenAlert();
                setAlert({
                    severity: 'success',
                    title: `${nameValue.toUpperCase()} DELETED SUCCESSFULLY!`,
                    content: `id - ${id}`
                });
                updateTable();
            })
            .catch(err => {
                console.log('deleteRow failed:');
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
    
    return (
        <IconButton aria-label="delete"
            color="secondary"
            size="small"
            onClick={() => deleteRow(id)}><DeleteIcon /></IconButton>
    );
}

export default DeleteRowButton;