import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TransactionForm = ({ show, account, onClose, onSubmit, transaction, isEditing }) => {
	const [transactionName, setTransactionName] = useState('');
	const [transactionDate, setTransactionDate] = useState(new Date().toISOString().substring(0, 10));
	const [amount, setAmount] = useState('');
	const [transactionCategory, setTransactionCategory] = useState('');
	const [transactionType, setTransactionType] = useState('');
	const [error, setError] = useState('');

	useEffect(() => {
		if (transaction) {
			setTransactionName(transaction.name);
			setTransactionDate(transaction.date);
			setAmount(Math.abs(transaction.amount));
			setTransactionCategory(transaction.category ? transaction.category[0] : '');
			setTransactionType(transaction.type);
		}
	}, [transaction]);

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
		const inputValue = e.target.value;
		const cleanedValue = inputValue.trim().split(' ')[0];
		setTransactionCategory(cleanedValue);
	};


	const handleTransactionTypeChange = (e) => {
		setTransactionType(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!transactionDate || !amount || !transactionName || !transactionType) {
			setError('Missing required field!');
			return;
		}

		const formData = {
			type: transactionType,
			name: transactionName,
			date: transactionDate,
			amount: transactionType === 'Expense' && account.type === 'cash' ? -amount : amount,
			category: transactionCategory
		};

		if (isEditing) {
			onSubmit({ ...formData, id: transaction.id });
		} else {
			onSubmit(formData);
		}
		onClose();
	};

	return (
		<Modal show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>{isEditing ? 'Edit' : 'Add'} Transaction</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form onSubmit={handleSubmit}>
					{error && <p className="text-danger">{error}</p>}
					<Form.Group controlId="transactionType">
						<Form.Label>Type</Form.Label>
						<Form.Select value={transactionType} onChange={handleTransactionTypeChange} required>
							<option value="">Select Transaction Type</option>
							<option value="Deposit">Deposit</option>
							<option value="Expense">Expense</option>
						</Form.Select>
					</Form.Group>
					<Form.Group controlId="transactionName">
						<Form.Label className="mt-2">Transaction Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter transaction name"
							value={transactionName}
							onChange={handleTransactionNameChange}
							maxLength="20"
							required
						/>
					</Form.Group>
					<Form.Group controlId="transactionDate">
						<Form.Label className="mt-2">Date</Form.Label>
						<Form.Control
							type="date"
							value={transactionDate}
							onChange={handleTransactionDateChange}
							required
						/>
					</Form.Group>
					<Form.Group controlId="amount">
						<Form.Label className="mt-2">Amount</Form.Label>
						<Form.Control
							type="number"
							placeholder="Enter transaction amount"
							value={amount}
							onChange={handleAmountChange}
							min="0"
							step="0.01"
							required
						/>
					</Form.Group>
					<Form.Group controlId="transactionCategory">
						<Form.Label className="mt-2">Category</Form.Label>
						<Form.Control
							type="text"
							placeholder="e.g. Food, Bills, Entertainment"
							value={transactionCategory}
							onChange={handleTransactionCategoryChange}
							maxLength="15"
							required
						/>
					</Form.Group>
					<div className="d-flex justify-content-center">
						<Button className="btn btn-primary btn-md mt-2" type="submit">
							{isEditing ? 'Update' : 'Add'}
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default TransactionForm;
