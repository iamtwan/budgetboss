'use client';

import React, { useState } from 'react';
import "./signuplogin.css";
import LoginForm from './AuthForms/LoginForm';
import SignUpForm from './AuthForms/SignUpForm';


const LoginSignUpPage = () => {
    const [showSignUp, setShowSignUp] = useState(false);

    const handleToggleForm = () => {
        setShowSignUp(!showSignUp);
    };

    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="container p-4 container-background auth-container">
                <h2 className='text-uppercase dark-text fw-bold'>{showSignUp ? 'Sign Up' : 'Account Login'}</h2>
                {showSignUp ?
                    <SignUpForm onToggleForm={handleToggleForm} />
                    :
                    <LoginForm onToggleForm={handleToggleForm} />
                }
            </div>
        </div>
    );
};

export default LoginSignUpPage;
