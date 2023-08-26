'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUserLogin } from '../../../services/apiService';
import { Button, Form } from 'react-bootstrap';

const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        setError(null);
        e.preventDefault();
        e.stopPropagation();

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
        };


        try {
            await fetchUserLogin(formData);
            router.push('/dashboard');
        } catch (error) {
            if (error.status === 401) {
                setError('The email/password combination is incorrect.');
            } else {
                setError('Network response was not ok. Please try again or contact support.');
            }
        }
    }

    return (
        <div className='container row'>
            <Form onSubmit={handleLogin} className='container row'>
                <div className='row d-flex justify-content-around'>
                    <Form.Group controlId='email' className='col-sm-12 col-md-5 col-lg-4 mb-3'>
                        <Form.Label className='fw-bold fs-6 text-uppercase nav-text text-nowrap'>Account Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Email Address'
                            aria-describedby='email'
                            autoComplete='email'
                            required
                        />
                        <p className='m-2 text-danger'>{error}</p>
                    </Form.Group>
                    <Form.Group controlId='password' className='col-sm-12 col-md-5 col-lg-4 mb-3'>
                        <Form.Label className='fw-bold fs-6 text-uppercase nav-text text-nowrap'>Account Password</Form.Label>
                        <Form.Control
                            type='password'
                            title='Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.'
                            minLength='8'
                            maxLength='20'
                            aria-labelledby='password'
                            placeholder='Password'
                            autoComplete='current-password'
                            required
                        />
                        <p className='m-2'><a className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' href='/recover'>Forgot Password?</a></p>
                    </Form.Group>
                </div>
                <div className='d-flex justify-content-end'>
                    <Button id='auth-login-btn' className='btn btn-md mt-2 fw-bold fs-6' type='submit'>
                        Login
                    </Button>
                </div>
            </Form>
        </div>
    );
}


export default LoginForm;
