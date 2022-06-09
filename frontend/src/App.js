import React from 'react';
import { Routes, Route } from 'react-router';
import UserTableComponent from './component/UserTableComponent';
import NotFoundComponent from './component/NotFoundComponent';
import HomeComponent from './component/HomeComponent';
import LoginComponent from './component/LoginComponent';
import './App.css';
import RegistrationComponent from './component/RegistrationComponent';
import AccountInfoComponent from './component/AccountInfoComponent';
import AuthRoute from './AuthRoute';
import AdminRoute from './AdminRoute';
import HeaderComponent from './component/HeaderComponent';
import FooterComponent from './component/FooterComponent';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from './context/AuthContextProvider';

const App = () => {

    return (
        <AuthContextProvider>
            <BrowserRouter>

                <HeaderComponent />

                <Routes>
                    <Route path='/' element=
                        {<HomeComponent />} />
                    <Route path='/user' element=
                        {<AdminRoute>
                            <UserTableComponent />
                        </AdminRoute>} />
                    <Route path='/account' element=
                        {<AuthRoute>
                            <AccountInfoComponent />
                        </AuthRoute>} />
                    <Route path='/login' element=
                        {<LoginComponent />} />
                    <Route path='/registration' element=
                        {<RegistrationComponent />} />
                    <Route path='*' element=
                        {<NotFoundComponent />} />
                </Routes>

                <FooterComponent />

            </BrowserRouter>
        </AuthContextProvider>
    );
}

export default App;