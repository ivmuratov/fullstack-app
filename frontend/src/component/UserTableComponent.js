import { useCallback, useEffect, useState } from "react";
import { deleteUser, getUsers } from "../service/connectToSpringBoot";
import { getAuthUser } from "../util/authUtil";
import { IconButton, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination, TableContainer, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateUserModal from './modal/CreateUserModal';
import '../App.css';
import AlertComponent from "./AlertComponent";
import TablePaginationActions from "./TablePaginationActions";
import EditUserModal from "./modal/EditUserModal";
import FilterComponent from "./FilterComponent";

const useStyles = makeStyles({
    tableThead: {
        '& > *': {
            background: '#053acfde',
            color: '#FFFFFF',
            fontSize: '20px'
        }
    },
    iconButton: {
        marginRight: '15px'
    },
    buttonGroupColumn: {
        width: '12%'
    }
});

const UserTableComponent = () => {

    const classes = useStyles();

    const [users, setUsers] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState([]);

    const [openAlert, setOpenAlert] = useState(false);

    const [alertContent, setAlertContent] = useState('');

    const [page, setPage] = useState(0);

    const [usersPerPage, setUsersPerPage] = useState(8);

    const [filterInput, setFilterInput] = useState('');

    const { username, password } = getAuthUser();

    const getAll = useCallback(() => {
        getUsers(username, password)
            .then(resp => {
                console.log('getAll:');
                console.log(resp);                
                setUsers(resp.data);
                setFilterInput('');
            })
            .catch(resp => {
                console.log('getAll:');
                console.log(resp);
            });
    }, [username, password]);

    useEffect(() => {
        getAll();
    }, [getAll, username, password]);

    const deleteRow = id => {
        if (!window.confirm(`Are you sure you want to delete the user by id - ${id}?`)) {
            return;
        }

        deleteUser(id, username, password)
            .then(resp => {
                console.log('deleteRow:');
                console.log(resp);
                handleOpenAlert();
                setAlertContent(`id - ${id}`);
                getAll();
            })
            .catch(err => {
                console.log('deleteRow failed:');
                console.log(err.response);
            });
    }

    const handleOpenAlert = () => {
        setOpenAlert(true);
    }

    const handleCloseAlert = () => {
        setOpenAlert(false);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeUsersPerPage = event => {
        setUsersPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    return (
        <div className="table-container">
            <AlertComponent open={openAlert}
                close={handleCloseAlert}
                severity={'success'}
                title={'USER DELETED SUCCESSFULLY!'}
                content={alertContent} />
            <CreateUserModal updateUserTable={getAll} />
            <FilterComponent filterField='email'
                items={users}
                setFilteredItems={setFilteredUsers}
                filterInput={filterInput}
                setFilterInput={setFilterInput} />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow className={classes.tableThead}>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Roles</TableCell>
                            <TableCell className={classes.buttonGroupColumn}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filterInput.length >= 1 ?
                            (usersPerPage > 0
                                ? filteredUsers.slice(page * usersPerPage, page * usersPerPage + usersPerPage)
                                : filteredUsers)
                                .map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.roles}</TableCell>
                                        <TableCell>
                                            <EditUserModal selectUser={user} updateUserTable={getAll} />
                                            <IconButton aria-label="delete"
                                                color="secondary"
                                                size="small"
                                                onClick={() => deleteRow(user.id)}><DeleteIcon /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))

                            : (usersPerPage > 0
                                ? users.slice(page * usersPerPage, page * usersPerPage + usersPerPage)
                                : users)
                                .map(user => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.roles}</TableCell>
                                        <TableCell>
                                            <EditUserModal selectUser={user} updateUserTable={getAll} />
                                            <IconButton aria-label="delete"
                                                color="secondary"
                                                size="small"
                                                onClick={() => deleteRow(user.id)}><DeleteIcon /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 8, 10, 15, { label: 'All', value: -1 }]}
                                colSpan={4}
                                count={filterInput.length >= 1 ? filteredUsers.length : users.length}
                                rowsPerPage={usersPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'users per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeUsersPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}

export default UserTableComponent;