'use client'

import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import SignUpForm from '../../Authentication/AuthForms/SignUpForm';


const SignUpNav = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <a type='button' className='btn-sm p-2 fw-bold nav-text link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' onClick={handleShow}>Sign Up</a>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id='example-modal-sizes-title-sm'>
                        <h2 className='text-uppercase align-items-center nav-text fw-bold fs-2'><i className='bi bi-dash-lg'></i>Sign Up<i className='bi bi-dash-lg'></i></h2>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body closeButton>
                    <SignUpForm />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SignUpNav;
