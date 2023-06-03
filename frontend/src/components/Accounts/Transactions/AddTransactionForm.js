import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddTransactionForm = ({ show, account, onClose, onSubmit }) => {
    const [transactionName, setTransactionName] = useState('');
    const [transactionDate, setTransactionDate] = useState(new Date().toISOString().substring(0, 10));
    const [amount, setAmount] = useState('');
    const [transactionCategory, setTransactionCategory] = useState('');
    const [error, setError] = useState('');


    const handleTransactionNameChange = (e) => {
        setTransactionName(e.target.value);
    };

    const handleTransactionDateChange = (e) => {
        setTransactionDate(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleTransactionCategoryChange = (e) => {
        setTransactionCategory(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!transactionDate || !amount) {
            setError('Both transaction date and amount are required.');
            return;
        }
        const formData = {
            name: transactionName,
            date: transactionDate,
            amount: parseFloat(amount),
            category: transactionCategory ? [transactionCategory] : [],
        };
        onSubmit(formData, account);
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Transaction</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {error && <p className="text-danger">{error}</p>}
                    <Form.Group controlId="transactionName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter transaction name"
                            value={transactionName}
                            onChange={handleTransactionNameChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="transactionDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={transactionDate}
                            onChange={handleTransactionDateChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter transaction amount"
                            value={amount}
                            onChange={handleAmountChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="transactionCategory">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter transaction category"
                            value={transactionCategory}
                            onChange={handleTransactionCategoryChange}
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
};

export default AddTransactionForm;
