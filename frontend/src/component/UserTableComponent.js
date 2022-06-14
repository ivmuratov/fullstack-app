import React from "react";
import { useCallback, useEffect, useState } from "react";
import { deleteUser, getUsers } from "../service/connectToSpringBoot";
import { getAuthUser } from "../util/authUtil";
import { makeStyles, Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination, TableContainer, Paper } from '@material-ui/core';
import CreateUserModal from './modal/CreateUserModal';
import '../App.css';
import AlertInfo from "./AlertInfo";
import TablePaginationActions from "./TablePaginationActions";
import EditUserModal from "./modal/EditUserModal";
import FilterInput from "./FilterInput";
import DeleteRowButton from "./DeleteRowButton";

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

    const [page, setPage] = useState(0);

    const [usersPerPage, setUsersPerPage] = useState(8);

    const [filterInput, setFilterInput] = useState('');

    const [openAlert, setOpenAlert] = useState(false);

    const [alert, setAlert] = useState({
        severity: 'success',
        title: '',
        content: ''
    });

    const { severity, title, content } = alert;

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
            <CreateUserModal updateUserTable={getAll} />
            <FilterInput filterField='email'
                items={users}
                setFilteredItems={setFilteredUsers}
                filterInput={filterInput}
                setFilterInput={setFilterInput} />
            <AlertInfo open={openAlert}
                close={handleCloseAlert}
                severity={severity}
                title={title}
                content={content} />
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
                                            <DeleteRowButton id={user.id} nameValue={'user'}                                                
                                                handleOpenAlert={handleOpenAlert}
                                                setAlert={setAlert}
                                                deleteFunc={deleteUser}
                                                updateTable={getAll} />
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
                                            <DeleteRowButton id={user.id} nameValue={'user'}                                                
                                                handleOpenAlert={handleOpenAlert}
                                                setAlert={setAlert}
                                                deleteFunc={deleteUser}
                                                updateTable={getAll} />
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