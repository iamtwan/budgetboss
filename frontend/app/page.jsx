'use client'

import 'bootstrap/dist/css/bootstrap.css';
import LoginSignUpPage from '../components/Authentication/LoginSignUpPage';
import LandingSection from 'components/Landing/LandingSection';
import React from 'react';

const LandingPage = () => {
    const signUpRef = React.useRef(null);

    return (
        <div>
            <LandingSection signUpRef={signUpRef} />
            <LoginSignUpPage signUpRef={signUpRef} />
        </div>
    );
}

export default LandingPage;
