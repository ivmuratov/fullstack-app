import React from "react";
import { useEffect, useState } from 'react';
import '../App.css';
import { useAuthContext } from '../context/AuthContextProvider';
import { getAuthRoles } from '../util/authUtil';

const isAdmin = authRoles => {
    return authRoles == null ? false : authRoles.split(',')
        .find(str => str === 'ADMIN') === 'ADMIN' ? true : false;
}

const HomeComponent = () => {

    const [dateTime, setDateTime] = useState(new Date());

    const { auth } = useAuthContext();

    useEffect(() => {
        const interval = setInterval(() => setDateTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const getLocalStorageItem = () => {
        console.log(localStorage);
        console.log(isAdmin(getAuthRoles()));
        console.log('auth - ' + auth);        
    }

    return (
        <div className='home-container'>
            <h1>Home Component</h1>
            <h5>{`Время - ${dateTime.toLocaleTimeString()}`}</h5>
            <br></br>           
            <button onClick={getLocalStorageItem}>local storage info</button>
        </div>
    );
}

export default HomeComponent;