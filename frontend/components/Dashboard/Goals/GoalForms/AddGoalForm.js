'use client';

import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddGoalForm = ({ goal, show, onClose, onSubmit }) => {
    const [goalName, setGoalName] = useState('');
    const [savedAmount, setSavedAmount] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [targetDate, setTargetDate] = useState('');

    useEffect(() => {
        if (goal) {
            setGoalName(goal.name);
            setSavedAmount(goal.savedAmount);
            setTargetAmount(goal.targetAmount);
            setTargetDate(goal.targetDate);
        }
    }, [goal]);

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

        if (goalName.length < 3 || goalName.length > 18) {
            alert('Goal Name should be between 3 and 18 characters');
            return;
        }

        const currentDate = new Date();
        const inputDate = new Date(targetDate);

        if (inputDate < currentDate) {
            const proceed = window.confirm('The Deadline date is in the past. Do you wish to proceed?');
            if (!proceed) {
                return;
            }
        }

        if (!savedAmount) {
            setSavedAmount('0');
        }

        if (Number(savedAmount) < 0 || Number(targetAmount) < 0) {
            alert('Amounts cannot be negative');
            return;
        }

        if (Number(savedAmount) > Number(targetAmount)) {
            alert('Saved Amount cannot be greater than Goal Amount');
            return;
        }

        if (savedAmount.length > 12 || targetAmount.length < 2 || targetAmount.length > 12) {
            alert('Please enter an amount between 2 and 10 digits');
            return;
        }

        const formData = {
            name: goalName,
            savedAmount: Number(savedAmount).toFixed(2),
            targetAmount: Number(targetAmount).toFixed(2),
            targetDate: targetDate
        }

        console.log(formData);

        onSubmit(formData);
        resetForm();
        onClose();
    }

    return (
        <Modal show={show} onHide={() => { resetForm(); onClose(); }}>
            <Modal.Header closeButton>
                <Modal.Title className='text-uppercase fw-bold fs-3'>
                    {goal ? 'Edit Goal' : 'Add Goal'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='goalName' className='mb-3'>
                        <Form.Label className='fw-bold fs-6 text-uppercase'>Goal Name</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter a name for your goal'
                            value={goalName}
                            onChange={handleGoalNameChange}
                            required
                        />
                    </Form.Group>
                    <div className='d-flex mt-2'>
                        <Form.Group controlId='savedAmount' className='me-2'>
                            <Form.Label className='fw-bold fs-6 text-uppercase'>
                                {goal ? 'Saved Amount' : 'Starting Amount'}
                            </Form.Label>
                            <div className="input-group mb-3">
                                <span className="input-group-text">$</span>
                                <Form.Control
                                    type='number'
                                    placeholder='Optional'
                                    value={savedAmount}
                                    onChange={handleSavedAmountChange}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group controlId='targetAmount' className='ms-2'>
                            <Form.Label className='fw-bold fs-6 text-uppercase'>Goal Amount</Form.Label>
                            <div className="input-group mb-3">
                                <span className="input-group-text">$</span>
                                <Form.Control
                                    type='number'
                                    placeholder='Goal target amount'
                                    value={targetAmount}
                                    onChange={handleTargetAmountChange}
                                    required
                                />
                            </div>
                        </Form.Group>
                    </div>
                    <Form.Group controlId='targetDate' className='me-3'>
                        <Form.Label className='fw-bold d-flex align-items-start fw-bold fs-6 text-uppercase'>Goal Deadline</Form.Label>
                        <Form.Control
                            type='date'
                            value={targetDate}
                            onChange={handleTargetDateChange}
                            required
                            className='w-50'
                        />
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                        <Button className='btn btn-primary btn-md mt-2 fw-bold fs-6' type='submit'>
                            {goal ? 'Edit' : 'Add'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddGoalForm;
