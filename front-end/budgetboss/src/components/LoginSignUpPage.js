import React, { useState } from 'react';
import "./signuplogin.css";
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';


const LoginSignUpPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleToggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="d-flex justify-content-center mt-4">
            <div className="w-50 border rounded p-4 shadow-sm">

                <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
                {isSignUp ? (
                    <SignUpForm onToggleForm={handleToggleForm} />
                ) : (
                    <LoginForm onToggleForm={handleToggleForm} />
                )}
            </div>
        </div>
    );
};

export default LoginSignUpPage;
