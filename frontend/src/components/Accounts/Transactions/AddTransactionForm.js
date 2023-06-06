import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddTransactionForm = ({ show, account, onClose, onSubmit, transaction }) => {
    const [transactionName, setTransactionName] = useState(transaction ? transaction.name : '');
    const [transactionDate, setTransactionDate] = useState(transaction ? transaction.date : new Date().toISOString().substring(0, 10));
    const [amount, setAmount] = useState(transaction ? transaction.amount.toString() : '');
    const [transactionCategory, setTransactionCategory] = useState(transaction && transaction.category.length > 0 ? transaction.category[0] : '');
    const [error, setError] = useState('');

    const isUpdate = transaction !== null;

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

    useEffect(() => {
        return () => {
            setTransactionName('');
            setTransactionDate(new Date().toISOString().substring(0, 10));
            setAmount('');
            setTransactionCategory('');
            setError('');
        };
    }, []);

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isUpdate ? 'Update Transaction' : 'Add Transaction'}</Modal.Title>
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
                            {isUpdate ? 'Update' : 'Add'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddTransactionForm;
