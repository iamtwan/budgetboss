'use client'

import 'bootstrap/dist/css/bootstrap.css'; // development
import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // production
// import 'bootstrap-icons/font/bootstrap-icons.css';
import withAuth from '../../../components/Authentication/ProtectedRoute';
import { useUser } from 'services/apiService';


const Settings = () => {
    const { data } = useUser();
    const [show, setShow] = useState(false);

    const currentUserEmail = data.email;


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            password: e.target.password.value,
        }

        try {
            // add api when ready
            // await updateAccountPass(formData);
            setShow(true);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='container main-dashboard container-row-top container-background dash-container-rows'>
            <h1 className='nav-text text-uppercase pt-2 text-center fw-bold'><i className='bi bi-dash'></i>Settings<i className='bi bi-dash'></i></h1>
            <div className='row h-100 pt-0 mt-0'>
                <div className='col-6 h-75 align-self-center d-flex flex-column justify-content-center p-4 mb-5'>
                    <Alert className='col-10' show={show} variant='primary' onClose={() => setShow(false)} dismissible>
                        Check your inbox! We've sent you a confirmation link for your password change.
                    </Alert>
                    <Form onSubmit={handleSubmit} className='container row'>
                        <div className='row d-flex flex-column justify-content-around'>
                            <Form.Group controlId='email' className='col-sm-12 col-md-5 col-lg-10 mb-3'>
                                <Form.Label className='fw-bold fs-6 text-uppercase nav-text text-nowrap'>Account Email</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder={currentUserEmail}
                                    aria-describedby='email'
                                    disabled
                                />
                            </Form.Group>
                            <Form.Group controlId='password' className='col-sm-12 col-md-5 col-lg-10 mb-3'>
                                <Form.Label className='fw-bold fs-6 text-uppercase nav-text text-nowrap'>Account Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    // pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^!&+=])[A-Za-z\d@#$%^!&+=]+$'
                                    title='Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.'
                                    // minLength='8'
                                    // maxLength='20'
                                    aria-labelledby='password'
                                    placeholder='Enter a new password'
                                    required
                                />
                            </Form.Group>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <Button id='auth-login-btn' className='btn btn-md mt-2 fw-bold fs-6' type='submit'>
                                Update Password
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className='col-6 border h-75 align-self-center'>test</div>
            </div>
        </div>
    );
}

export default withAuth(Settings);
