import { useCallback, useEffect, useState } from "react";
import { getUserInfo } from "../service/connectToSpringBoot";
import { getAuthUser } from "../util/authUtil";
import '../App.css';

const AccountInfoComponent = () => {

    const [account, setAccount] = useState({
        name: '',
        email: '',
        roles: ''
    });

    const { username, password } = getAuthUser();

    const getAccount = useCallback(() => {
        getUserInfo(username, password)
        .then(resp => {
            console.log('getInfo:')
            console.log(resp);
            setAccount(resp.data);
        })
        .catch(resp => {
            console.log('getInfo:')
            console.log(resp);
        });
    }, [username, password]);

    useEffect(() => {
        getAccount();
    }, [getAccount, username, password]);

    return (
        <div className="account-container">
            <h1>Account:</h1>
            <br></br>
            <h5>Name: {account.name}</h5>
            <h5>Email: {account.email}</h5>
            <h5>Roles: {account.roles}</h5>
        </div>
    );
}

export default AccountInfoComponent;