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

        if (savedAmount.length < 4 || savedAmount.length > 12 || targetAmount.length < 4 || targetAmount.length > 12) {
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
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const formData = {
    //         name: goalName,
    //         savedAmount: savedAmount,
    //         targetAmount: targetAmount,
    //         targetDate: targetDate
    //     }

    //     onSubmit(formData);
    //     resetForm();
    //     onClose();
    // }

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
                            placeholder='Enter your starting amount'
                            value={savedAmount}
                            onChange={handleSavedAmountChange}
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
