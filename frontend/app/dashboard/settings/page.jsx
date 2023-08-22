'use client'

import 'bootstrap/dist/css/bootstrap.css'; // development
import { Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // production
// import 'bootstrap-icons/font/bootstrap-icons.css';
import withAuth from '../../../components/Authentication/ProtectedRoute';
import { useUser } from 'services/apiService';
import { changePassword, unlinkAllItems, deleteUserAccount } from 'services/apiService';
import { useRouter } from 'next/navigation';


const Settings = () => {
    const { data } = useUser();
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [deleteButton, setDeleteButton] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const currentUserEmail = data.email;


    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            password: e.target.password.value,
        }

        try {
            await changePassword(formData);
            setShow(true);

            router.push('/');
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteDisclaimer = (e) => {
        setDeleteButton(e.target.checked);
    }

    const handleDeleteUserAccount = async () => {
        if (deleteButton) {
            try {
                await deleteUserAccount();
                console.log('successful account delete')
                router.push('/');
            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleUnlinkAllItems = async () => {
        try {
            await unlinkAllItems();
        } catch (error) {
            console.error(error);
        }
    }

    const handleEmailToggle = async () => {
        const checkedStatus = !isChecked;
        setIsChecked(checkedStatus);

        try {
            // add api call when ready
            // await emailNotifications(checkedStatus);
            // set timeout on call for spam toggle
            console.log(`Toggle is now: ${checkedStatus ? 'Checked' : 'Unchecked'}`)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='container settings-container container-background'>
            <h1 className='nav-text text-uppercase pt-2 text-center fw-bold'><i className='bi bi-dash'></i>Settings<i className='bi bi-dash'></i></h1>
            <div className='row w-100 h-75 pt-0 mt-0'>
                <div className='col-md-10 col-lg-6 col-12 h-75 h-auto-md align-self-center d-flex flex-column justify-content-center p-4 settings-section'>
                    <Form onSubmit={handlePasswordSubmit} className='container row'>
                        <div className='row d-flex flex-column justify-content-around'>
                            <div className='w-100'>
                                <Form.Group controlId='email' className='w-75 col-sm-12 col-md-5 col-lg-10 mb-3'>
                                    <Form.Label className='fw-bold fs-6 text-uppercase nav-text text-nowrap'>Account Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder={currentUserEmail}
                                        aria-describedby='email'
                                        disabled
                                    />
                                </Form.Group>
                            </div>
                            <div className="d-flex justify-content-between align-items-center w-100 mb-3">
                                <Form.Group controlId='password' className='w-75 col-sm-12 col-md-5 col-lg-10 mb-3'>
                                    <Form.Label className='fw-bold fs-6 text-uppercase nav-text text-nowrap'>Account Password</Form.Label>
                                    <Form.Control
                                        type='password'
                                        pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^!&+=])[A-Za-z\d@#$%^!&+=]+$'
                                        title='Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.'
                                        minLength='8'
                                        maxLength='20'
                                        aria-labelledby='password'
                                        placeholder='Enter a new password'
                                        required
                                    />
                                </Form.Group>
                                <Button id='auth-login-btn' className='btn btn-md mt-3 fw-bold fs-6' type='submit'>
                                    Update
                                </Button>
                            </div>
                        </div>
                    </Form>
                    <Alert className='col-10' show={show} variant='success' onClose={() => setShow(false)} dismissible>
                        Success! Your password has been successfully changed.
                    </Alert>
                </div>
                <div className='col-md-10 col-lg-6 col-12 h-75 align-self-center d-flex flex-column justify-content-center p-4 settings-section'>
                    <div className='d-flex w-100 justify-content-between align-items-center'>
                        <div>
                            <h3 className='fw-bold fs-4 text-uppercase nav-text text-nowrap'>Delete Account</h3>
                            <Form.Check
                                type='checkbox'
                                id={'delete-acct-check'}
                                label={'I understand deletion is permanent!'}
                                onChange={handleDeleteDisclaimer}
                            />
                        </div>
                        <div>
                            <Button id='' className='' variant='danger' type='button' onClick={handleDeleteUserAccount} disabled={!deleteButton}>Delete</Button>
                        </div>
                    </div>
                    <div className='d-flex w-100 justify-content-between align-items-center mt-4'>
                        <div>
                            <h3 className='fw-bold fs-4 text-uppercase nav-text text-nowrap'>Unlink Plaid Accounts</h3>
                            <p className=''>Disconnect all Plaid accounts.</p>
                        </div>
                        <div>
                            <Button id='auth-login-btn' className='' variant='' type='button' onClick={handleUnlinkAllItems}>Unlink</Button>
                        </div>
                    </div>
                    <div className='d-flex w-100 justify-content-between align-items-center mt-3'>
                        <div>
                            <h3 className='fw-bold fs-4 text-uppercase nav-text text-nowrap'>Email Notifications</h3>
                            <p className='test-color'>Would like pertinent account updates?</p>
                        </div>
                        <div>
                            <Button id='toggle-check' className='btn btn-md px-4' variant='' type='button' onClick={handleEmailToggle}>
                                {isChecked ? <i className="bi bi-envelope-check"></i> : <i className="bi bi-x-lg"></i>}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(Settings);
