'use client'

import 'bootstrap/dist/css/bootstrap.min.css';
import LoginSignUpSection from '../components/Authentication/LoginSignUpSection';
import LandingSection from 'components/Landing/LandingSection';
import React from 'react';

const LandingPage = () => {
    const signUpRef = React.useRef(null);

    return (
        <div>
            <LandingSection signUpRef={signUpRef} />
            <LoginSignUpSection signUpRef={signUpRef} />
        </div>
    );
}

export default LandingPage;
