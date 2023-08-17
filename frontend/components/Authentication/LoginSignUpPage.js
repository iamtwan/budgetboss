'use client'

import LoginForm from './AuthForms/LoginForm';
import SignUpForm from './AuthForms/SignUpForm';
import Accordion from 'react-bootstrap/Accordion';
import React from 'react';


const LoginSignUpPage = ({ signUpRef }) => {
    return (
        <div className='d-flex justify-content-center mb-5'>
            <Accordion defaultActiveKey='1' flush className='container p-4 container-background auth-container'>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>
                        <h2 className='text-uppercase nav-text fw-bold fs-2'><i class="bi bi-dash-lg"></i>Login<i class="bi bi-dash-lg"></i></h2>
                    </Accordion.Header>
                    <Accordion.Body className='my-accordion-body'>
                        <LoginForm />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item ref={signUpRef} eventKey='1'>
                    <Accordion.Header>
                        <h2 className='text-uppercase align-items-center nav-text fw-bold fs-2'><i class="bi bi-dash-lg"></i>Sign Up<i class="bi bi-dash-lg"></i></h2>
                    </Accordion.Header>
                    <Accordion.Body className='my-accordion-body'>
                        <SignUpForm />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default LoginSignUpPage;
