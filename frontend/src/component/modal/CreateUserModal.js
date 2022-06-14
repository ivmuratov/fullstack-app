import React from "react";
import { useState } from "react";
import { FormGroup, Button, TextField, makeStyles, IconButton, MenuItem, DialogActions } from "@material-ui/core";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import { createUser } from "../../service/connectToSpringBoot";
import { getAuthUser } from "../../util/authUtil";
import { useForm, Controller } from "react-hook-form";
import AlertInfo from '../AlertInfo';
import '../../App.css';
import Modal from "./Modal";

const useStyles = makeStyles({
    container: {
        width: '80%',
        margin: '0px auto 50px auto'
    },
    button: {
        width: '70px',
        marginLeft: '7px'
    },
    iconButton: {
        marginRight: '7px'
    },
    selectFormControl: {
        minWidth: 120,
    },
});

const initUser = {
    name: '',
    email: '',
    password: '',
    roles: ''
};

const CreateUserModal = ({ updateUserTable }) => {

    const classes = useStyles();

    const [openModal, setOpenModal] = useState(false);

    const [openAlert, setOpenAlert] = useState(false);

    const [alert, setAlert] = useState({
        severity: 'success',
        title: '',
        content: ''
    });

    const { severity, title, content } = alert;

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues: initUser });

    const { username, password } = getAuthUser();

    const onSubmit = req => {
        createUser(req, username, password)
            .then(resp => {
                console.log('createUser:');
                console.log(resp);
                resetForm();
                handleCloseModal();
                updateUserTable();
                handleOpenAlert();
                setAlert({
                    severity: 'success',
                    title: 'USER CREATED SUCCESSFULLY!',
                    content: `Name - ${resp.data.name}<br/>E-Mail - ${resp.data.email}`
                });
            })
            .catch(err => {
                console.log('createUser failed:');
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

    const resetForm = () => {
        reset(initUser);
    }

    const handleOpenAlert = () => {
        setOpenAlert(true);
    }

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <div className="create-button-modal-container">
            <IconButton aria-label='add'
                color='primary'
                onClick={handleOpenModal}>
                <GroupAddIcon className={classes.iconButton} fontSize='large' />
                Add New
            </IconButton>
            <AlertInfo open={openAlert}
                close={handleCloseAlert}
                severity={severity}
                title={title}
                content={content} />
            <Modal openModal={openModal}
                closeModal={handleCloseModal}
                title='Create User'>
                <FormGroup className={classes.container}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={control}
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
                            name="password"
                            control={control}
                            rules={{
                                required: { value: true, message: 'You must enter a Password' },
                                minLength: { value: 5, message: 'Password must be at least 5 chars' },
                                maxLength: { value: 20, message: 'Password must be no more than 20 chars' }
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

                        <Controller
                            name="roles"
                            control={control}
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
                                Create
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

export default CreateUserModal;