'use client'

import LoginForm from './AuthForms/LoginForm';
import SignUpForm from './AuthForms/SignUpForm';
import Accordion from 'react-bootstrap/Accordion';


const LoginSignUpPage = () => {
    return (
        <div className='d-flex justify-content-center'>
            <Accordion defaultActiveKey='0' flush className='container p-4 container-background auth-container'>
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>
                        <h2 className='text-uppercase nav-text fw-bold fs-3'>Login</h2>
                    </Accordion.Header>
                    <Accordion.Body className='my-accordion-body'>
                        <LoginForm />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey='1'>
                    <Accordion.Header>
                        <h2 className='text-uppercase align-items-center nav-text fw-bold fs-3'>Sign Up</h2>
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
