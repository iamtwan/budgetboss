import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createManualTransaction, updateManualTransaction } from '../../../../services/apiService';
import { useSWRConfig } from 'swr';

const TransactionForm = ({ show, account, onClose, transaction, isEditing }) => {
	const [transactionName, setTransactionName] = useState('');
	const [transactionDate, setTransactionDate] = useState(new Date().toISOString().substring(0, 10));
	const [amount, setAmount] = useState('');
	const [transactionCategory, setTransactionCategory] = useState('');
	const [transactionType, setTransactionType] = useState('');
	const [error, setError] = useState('');

	const { mutate } = useSWRConfig();

	useEffect(() => {
		if (transaction) {
			setTransactionName(transaction.name);
			setTransactionDate(transaction.date);
			setAmount(Math.abs(transaction.amount));
			setTransactionCategory(transaction.category);
			setTransactionType(transaction.type);
		}
	}, [transaction]);

	const handleTransactionNameChange = (e) => {
		setTransactionName(e.target.value);
	}

	const handleTransactionDateChange = (e) => {
		setTransactionDate(e.target.value);
	}

	const handleAmountChange = (e) => {
		setAmount(e.target.value);
	}

	const handleTransactionCategoryChange = (e) => {
		setTransactionCategory(e.target.value);
	}

	const handleTransactionTypeChange = (e) => {
		setTransactionType(e.target.value);
	}

	const handleUpdateTransaction = async (formData) => {
		try {
			await updateManualTransaction(transaction.id, formData);

			mutate(`${API_BASE_URL}/manual-transactions/${account.id}`);
			mutate(`${API_BASE_URL}/manual-institutions`);
			mutate(`${API_BASE_URL}/charts`);
		} catch (error) {
			setError('Error updating transaction:', error);
		}
	}

	const handleAddTransactionSubmit = async (formData) => {
		if (isEditing) {
			handleUpdateTransaction(formData);
			return;
		}

		try {
			await createManualTransaction(account.id, formData);

			mutate(`${API_BASE_URL}/manual-transactions/${account.id}`);
			mutate(`${API_BASE_URL}/manual-institutions`);
			mutate(`${API_BASE_URL}/charts`);
		} catch (error) {
			setError('Error adding transaction:', error);
		}
	}

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
			amount: transactionType === 'Expense' ? amount : -amount,
			category: transactionCategory,
		}

		if (isEditing) {
			handleUpdateTransaction({ ...formData, id: transaction.id });
		}

		handleAddTransactionSubmit(formData);
		onClose();
	}

	return (
		<Modal centered show={show} onHide={onClose}>
			<Modal.Header className='container-background nav-text' closeButton>
				<Modal.Title className='text-uppercase fw-bold fs-4'>{isEditing ? 'Edit' : 'Add'} Transaction</Modal.Title>
			</Modal.Header>
			<Modal.Body className='container-background nav-text rounded'>
				<Form onSubmit={handleSubmit} className='container'>
					{error && <p className='text-danger'>{error}</p>}
					<div className='row mb-3'>
						<Form.Group controlId='transactionType' className='col-12'>
							<Form.Label className='fw-bold'>Type<span className='red-text'>*</span></Form.Label>
							<Form.Select value={transactionType} onChange={handleTransactionTypeChange} required>
								<option value=''>Select Transaction Type</option>
								<option value='Deposit'>Deposit</option>
								<option value='Expense'>Expense</option>
							</Form.Select>
						</Form.Group>
					</div>
					<div className='row mb-3'>
						<Form.Group controlId='transactionName' className='col-6'>
							<Form.Label className='mt-2 fw-bold'>Name<span className='red-text'>*</span></Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter transaction name'
								value={transactionName}
								onChange={handleTransactionNameChange}
								maxLength='20'
								required
							/>
						</Form.Group>
						<Form.Group controlId='transactionDate' className='col-6'>
							<Form.Label className='mt-2 fw-bold'>Date<span className='red-text'>*</span></Form.Label>
							<Form.Control
								type='date'
								value={transactionDate}
								onChange={handleTransactionDateChange}
								required
							/>
						</Form.Group>
					</div>
					<div className='row mb-3'>
						<Form.Group controlId='amount' className='col-6'>
							<Form.Label className='mt-2 fw-bold '>Transaction Total<span className='red-text'>*</span></Form.Label>
							<div className='input-group'>
								<span className='input-group-text'><span className='nav-text fw-bold'>$</span></span>
								<Form.Control
									type='number'
									placeholder='Amount'
									value={amount}
									onChange={handleAmountChange}
									min='0'
									step='0.01'
									required
								/>
							</div>
						</Form.Group>
						<Form.Group controlId='transactionCategory' className='col-6'>
							<Form.Label className='mt-2 fw-bold'>Category<span className='red-text'>*</span></Form.Label>
							<Form.Control
								type='text'
								placeholder='e.g. Food, Deposit, Bills'
								value={transactionCategory}
								onChange={handleTransactionCategoryChange}
								maxLength='15'
								required
							/>
						</Form.Group>
					</div>
					<div className='d-flex justify-content-end'>
						<Button id='tx-add-btn' className='btn btn-primary btn-md mt-2' type='submit'>
							{isEditing ? 'Update' : 'Add'}
						</Button>
					</div>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default TransactionForm;
