'use client'

import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { resetUserPassword } from 'services/apiService';

const ResetCallback = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token, setToken] = useState(null);
    const [error, setError] = useState('');
    const [formMessage, setFormMessage] = useState(false);

    useEffect(() => {
        const fetchedToken = searchParams.get('token');
        if (!fetchedToken) {
            setError('Invalid URL. Redirecting...');
            setTimeout(() => {
                router.push('/reset_password');
            }, 1100);
        } else {
            setToken(fetchedToken);
        }
    }, [searchParams]);

    if (!token) {
        return (
            <div className='container reset-container container-background'>
                <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
                    <Spinner animation='border' />
                    <p className='text-danger fw-bold'>{error}</p>
                </div>
            </div>
        );
    }

    const handleNewPassword = async (e) => {
        e.preventDefault();
        const password = e.target.password.value;

        try {
            await resetUserPassword(password, token);
            setFormMessage(true);

            setTimeout(() => {
                router.push('/');
            }, 2000);

        } catch (error) {
            setError('Could not update user password. Please try again or resend recovery email.');
        }
    }


    return (
        <div className='container reset-container container-background'>
            <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
                <Form onSubmit={handleNewPassword} className='w-50'>
                    <Form.Group className='mb-3'>
                        <div className='text-center'>
                            <Form.Label className='text-uppercase nav-text fw-semibold fs-4'>Update Account New Password</Form.Label>
                        </div>
                        <Form.Control
                            required
                            type='password'
                            name='password'
                            pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^!&+=])[A-Za-z\d@#$%^!&+=]+$'
                            title='Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.'
                            minLength='8'
                            maxLength='20'
                            placeholder='Please enter new password'
                            className='form-control text-center'
                            id='password-recovery'
                            aria-describedby='recoverPassword'
                        />
                        <div className='text-center'>
                            <Form.Text>
                                {error && <p className='text-danger mt-2'>
                                    {error}
                                    <p className='mt-3'>
                                        <a className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' href='/reset_password'>Resend Recover Email</a>
                                    </p>
                                </p>}
                                {formMessage && <p className='text-success fw-bold mt-2'>User password updated! Please login.</p>}
                            </Form.Text>
                        </div>
                    </Form.Group>
                    <Button variant='' id='reset-btn' type='submit' className='w-100 text-uppercase'>
                        Update Password
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default ResetCallback;
