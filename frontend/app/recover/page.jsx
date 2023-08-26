'use client'

import 'bootstrap/dist/css/bootstrap.css';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { sendResetLink } from 'services/apiService';

const RecoverAccount = () => {
    const [error, setError] = useState('');
    const [btnMessage, setBtnMessage] = useState(false);

    const handleResetLink = async (e) => {
        e.preventDefault();
        const emailValue = e.target.email.value;

        try {
            await sendResetLink(emailValue);

            setBtnMessage(true);
        } catch (error) {
            setError(`Error sending reset email to '${emailValue}'. Please try again or contact support.`);
        }
    }

    return (
        <div className='container reset-container container-background'>
            <div className='d-flex align-items-center flex-column h-100 justify-content-center'>
                <Form onSubmit={handleResetLink} className='w-50'>
                    <Form.Group className='mb-3'>
                        <div className='text-center'>
                            <Form.Label className='text-uppercase nav-text fw-semibold fs-4'>Account Recovery</Form.Label>
                        </div>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            placeholder='Please enter your email'
                            className='form-control text-center'
                            id='exampleInputEmail1'
                            aria-describedby='emailHelp'
                        />
                        <div className='text-center'>
                            <Form.Text>
                                {error && <p className='text-danger mt-2'>{error}</p>}
                                {btnMessage && <p className='text-success fw-bold mt-2'>Recovery email sent. Please check your email.</p>}
                            </Form.Text>
                        </div>
                    </Form.Group>
                    <Button variant='' id='reset-btn' type='submit' className='w-100 text-uppercase'>
                        {btnMessage ? 'Resend Reset Email' : 'Send Reset Email'}
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default RecoverAccount;
