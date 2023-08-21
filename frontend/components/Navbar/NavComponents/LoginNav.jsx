'use client'

import { Modal, Link } from 'react-bootstrap';
import { useState } from 'react';
import LoginForm from '../../Authentication/AuthForms/LoginForm';


const LoginNav = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='me-2'>
            <a type='button' className='btn-sm p-2 fw-bold nav-text link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' onClick={handleShow}>Login</a>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id='example-modal-sizes-title-sm'>
                        <h2 className='text-uppercase nav-text fw-bold fs-2'><i className='bi bi-dash-lg'></i>Login<i className='bi bi-dash-lg'></i></h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body closeButton>
                    <LoginForm />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default LoginNav;
