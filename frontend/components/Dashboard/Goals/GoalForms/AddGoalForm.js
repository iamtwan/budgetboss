'use client';

import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddGoalForm = ({ show, onClose, onSubmit }) => {
    const [goalName, setGoalName] = useState('');
    const [savedAmount, setSavedAmount] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [targetDate, setTargetDate] = useState('');

    const resetForm = () => {
        setGoalName('');
        setSavedAmount('');
        setTargetAmount('');
        setTargetDate('');
    }

    const handleGoalNameChange = (e) => {
        setGoalName(e.target.value);
    }

    const handleSavedAmountChange = (e) => {
        setSavedAmount(e.target.value);
    }

    const handleTargetAmountChange = (e) => {
        setTargetAmount(e.target.value);
    }

    const handleTargetDateChange = (e) => {
        setTargetDate(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            name: goalName,
            savedAmount: savedAmount,
            targetAmount: targetAmount,
            targetDate: targetDate
        }

        onSubmit(formData);
        resetForm();
        onClose();
    };

    return (
        <Modal show={show} onHide={() => { resetForm(); onClose(); }}>
            <Modal.Header closeButton>
                <Modal.Title>Add Goal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='goalName'>
                        <Form.Label>Goal Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter a name for your goal'
                            value={goalName}
                            onChange={handleGoalNameChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId='savedAmount'>
                        <Form.Label>Starting Amount</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='If none enter 0'
                            value={savedAmount}
                            onChange={handleSavedAmountChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId='targetAmount'>
                        <Form.Label>Goal Amount</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Enter your goal amount'
                            value={targetAmount}
                            onChange={handleTargetAmountChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId='targetDate'>
                        <Form.Label>Goal Deadline</Form.Label>
                        <Form.Control
                            type='date'
                            value={targetDate}
                            onChange={handleTargetDateChange}
                            required
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button className="btn btn-primary btn-md mt-2" type="submit">
                            Add
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddGoalForm;
