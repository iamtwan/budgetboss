import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LoginSignUpPage from '../components/LoginSignUpPage';
import DashboardPage from './dashboard';


const HomePage = () => {
    return (
        <div>
            <h1 className="text-uppercase">Budget Boss</h1>
            <LoginSignUpPage />
        </div>
    );
};

export default HomePage;
