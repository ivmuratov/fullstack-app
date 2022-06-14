import React from 'react';
import { useState } from "react";
import { FormGroup, Button, TextField, makeStyles, IconButton, MenuItem, DialogActions } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import '../../App.css';
import { updateUser } from "../../service/connectToSpringBoot";
import { getAuthUser } from "../../util/authUtil";
import { useForm, Controller } from "react-hook-form";
import AlertInfo from '../AlertInfo';
import Modal from './Modal';

const useStyles = makeStyles({
    container: {
        width: '80%',
        margin: '0px auto 50px auto'
    },
    button: {
        width: '70px',
        marginLeft: '7px'
    },
});

const initFieldsUser = {
    id: '',
    name: '',
    email: '',
    roles: ''
};

const EditUserModal = ({ selectUser, updateUserTable }) => {

    const classes = useStyles();

    const [fieldsUser, setFieldsUser] = useState(initFieldsUser);

    const [openModal, setOpenModal] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);

    const [alert, setAlert] = useState({
        severity: 'success',
        title: '',
        content: ''
    });

    const { severity, title, content } = alert;

    const { id, name, email, roles } = fieldsUser;

    const { control, formState: { errors }, handleSubmit } = useForm();

    const { username, password } = getAuthUser();

    const onSubmit = req => {
        console.log(req);
        updateUser(id, req, username, password)
            .then(resp => {
                console.log('editUser:');
                console.log(resp);
                handleCloseModal();
                updateUserTable();
                handleOpenAlert();
                setAlert({
                    severity: 'success',
                    title: 'USER UPDATED SUCCESSFULLY!',
                    content: `New Name - ${resp.data.name}
                    <br/>New E-Mail - ${resp.data.email}
                    <br/>New Roles - ${resp.data.roles}`
                });
            })
            .catch(err => {
                console.log('editUser failed:');
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

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleOpenAlert = () => {
        setOpenAlert(true);
    }

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }

    return (
        <div className="edit-button-modal-container">
            <IconButton aria-label="edit"
                size="small"
                onClick={() => {
                    handleOpenModal();
                    setFieldsUser(selectUser);
                }}><EditIcon /></IconButton>
            <AlertInfo open={openAlert}
                close={handleCloseAlert}
                severity={severity}
                title={title}
                content={content} />
            <Modal openModal={openModal}
                closeModal={handleCloseModal}
                title='Edit User'>
                <FormGroup className={classes.container}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue={name}
                            rules={{
                                required: { value: true, message: 'You must enter a Name' },
                                minLength: { value: 5, message: 'Name must be at least 5 chars' },
                                maxLength: { value: 20, message: 'Name must be no more than 20 chars' }
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
                            defaultValue={email}
                            rules={{
                                required: { value: true, message: 'You must enter a Email' },
                                minLength: { value: 5, message: 'Email must be at least 5 chars' },
                                maxLength: { value: 50, message: 'Email must be no more than 50 chars' }
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
                            name="roles"
                            control={control}
                            defaultValue={roles}
                            rules={{
                                required: { value: true, message: 'You must enter a Roles' },
                            }}
                            render={({ field }) => {
                                return (errors.roles || openAlert ?
                                    <TextField className={classes.selectFormControl}
                                        label="Roles"
                                        id="standard-select-currency"
                                        select
                                        error
                                        helperText={errors.roles?.message}
                                        {...field}>
                                        <MenuItem value={'USER'}>User role</MenuItem>
                                        <MenuItem value={'ADMIN,USER'}>Admin role</MenuItem>
                                    </TextField>

                                    : <TextField className={classes.selectFormControl}
                                        label="Roles"
                                        id="standard-select-currency"
                                        select
                                        {...field}>
                                        <MenuItem value={'USER'}>User role</MenuItem>
                                        <MenuItem value={'ADMIN,USER'}>Admin role</MenuItem>
                                    </TextField>
                                );
                            }} />

                        <DialogActions>
                            <Button className={classes.button}
                                color="primary"
                                type="submit"
                                variant="contained">
                                Edit
                            </Button>
                            <Button className={classes.button}
                                color="secondary"
                                variant="contained"
                                onClick={handleCloseModal}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </form>
                </FormGroup>
            </Modal>
        </div>
    );
}

export default EditUserModal;