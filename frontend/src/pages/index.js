import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LoginSignUpPage from '../components/Authentication/LoginSignUpPage';



const LandingPage = () => {
    return (
        <div>
            <h1 className="text-uppercase">Budget Boss</h1>
            <LoginSignUpPage />
        </div>
    );
};

export default LandingPage;
