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
            <a type='button' className='btn-sm p-2 fw-bold nav-text link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover' onClick={handleShow}>About</a>
            <Modal size='lg' show={show} onHide={handleClose}>
                <Modal.Header className='questions-header' closeButton>
                    <Modal.Title className='text-uppercase text-center w-100'><span className='nav-text fw-bold'><i class="bi bi-dash-lg"></i>Frequently Asked Questions<i class="bi bi-dash-lg"></i></span></Modal.Title>
                </Modal.Header>
                <Modal.Body className='navbar-container'>
                    <NavQuestions />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AboutNav;
