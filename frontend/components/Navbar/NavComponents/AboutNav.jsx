'use client'

import { Modal } from 'react-bootstrap';
import { useState } from 'react';
import NavQuestions from './NavQuestions';

function AboutNav() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className='me-2'>
            <a type='button' className='btn-sm p-2 fw-semibold nav-text link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' onClick={handleShow}>About</a>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-uppercase'>Your questions, Answered!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NavQuestions />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AboutNav;
