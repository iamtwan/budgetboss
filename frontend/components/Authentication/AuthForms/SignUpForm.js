'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSignUp } from '../../../services/apiService';
import { Button, Form } from 'react-bootstrap';

const SignUpForm = () => {
    const router = useRouter();
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        const formData = {
            email: e.target.email.value,
            password: e.target.password.value,
            passwordConfirmation: e.target.passwordConfirmation.value,
        }

        try {
            await createSignUp(formData);

            router.push('/dashboard');
        } catch (error) {
            setError(`The email '${formData.email}' already exists.`);
            console.error('An error has occurred during registration.', error);
        }
    }

    return (
        <div className='container row'>
            <Form className='row d-flex justify-content-around' onSubmit={handleSignUp}>
                {error && <p className='text-danger'>{error}</p>}
                <div className='col-sm-12 col-md-5 col-lg-4 mb-3'>
                    <Form.Label htmlFor='exampleInputEmail1' className='form-label fw-bold nav-text'>
                        Email Address
                    </Form.Label>
                    <Form.Control
                        required
                        // value='test@gmail.com'
                        type='email'
                        name='email'
                        className='form-control'
                        id='exampleInputEmail1'
                        aria-describedby='emailHelp'
                        placeholder='Enter a valid email'
                    />
                    <Form.Text id='emailHelp' className='form-text'>
                        We'll never share your email with anyone else!
                    </Form.Text>
                </div>
                <div className='col-sm-12 col-md-5 col-lg-4'>
                    <Form.Label htmlFor='password' className='col-form-label fw-bold nav-text'>
                        Password
                    </Form.Label>
                    <div className='row g-3 align-items-center mb-1'>
                        <div className='col-auto'>
                            <Form.Control
                                required
                                // value='Test123!!'
                                pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^!&+=])[A-Za-z\d@#$%^!&+=]+$'
                                title='Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.'
                                minLength='8'
                                maxLength='20'
                                type='password'
                                name='password'
                                id='inputPassword1'
                                className='form-control'
                                aria-labelledby='password'
                                placeholder='Password'
                            />
                        </div>
                        <div className='col-auto'>
                            <Form.Text id='passwordHelpInline' className='form-text text-center'>
                                Must be 8-20 characters long.
                            </Form.Text>
                        </div>
                    </div>
                    <Form.Label htmlFor='passwordConfirmation' className='col-form-label fw-bold nav-text'>
                        Confirm Password
                    </Form.Label>
                    <div className='row g-3 align-items-center'>
                        <div className='col-auto'>
                            <Form.Control
                                required
                                // value='Test123!!'
                                pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^!&+=])[A-Za-z\d@#$%^!&+=]+$'
                                title='Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.'
                                minLength='8'
                                maxLength='20'
                                type='password'
                                name='passwordConfirmation'
                                id='inputPassword2'
                                className='form-control'
                                aria-labelledby='passwordConfirmation'
                                placeholder='Password Confirmation'
                            />
                        </div>
                        <div className='col-auto'>
                            <Form.Text id='passwordHelpInline' className='form-text'>
                                Must be 8-20 characters long.
                            </Form.Text>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-end'>
                    <Button id='auth-signup-btn' type='submit' className='btn btn-primary mt-3 btn-shrink'>
                        Sign Up
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default SignUpForm;
