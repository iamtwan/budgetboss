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
            <div className="w-50 border rounded p-4 shadow-lg container-background">
                <h2>{showSignUp ? 'Sign Up' : 'Login'}</h2>
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
