'use client';

import { useRouter } from 'next/navigation';
import { fetchUserLogin } from '../../../services/apiService';
import { Button, Form } from 'react-bootstrap';

const LoginForm = () => {
    const router = useRouter();

    const handleLogin = async (e) => {
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
            console.error(error.response.data);
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
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId='password' className='col-sm-12 col-md-5 col-lg-4 mb-3'>
                        <Form.Label className='fw-bold fs-6 text-uppercase nav-text text-nowrap'>Account Password</Form.Label>
                        <Form.Control
                            type='password'
                            pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^!&+=])[A-Za-z\d@#$%^!&+=]+$'
                            title='Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.'
                            minLength='8'
                            maxLength='20'
                            aria-labelledby='password'
                            placeholder='Password'
                            required
                        />
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
