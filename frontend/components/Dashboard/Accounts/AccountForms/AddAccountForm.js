'use client';

import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createManualAccount, useManualData } from '../../../../services/apiService';

const AddAccountForm = ({ show, onClose }) => {
    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [newInstitution, setNewInstitution] = useState('');
    const [accountName, setAccountName] = useState('');
    const [balance, setBalance] = useState('');
    const [selectedAccountType, setSelectedAccountType] = useState('');
    const [error, setError] = useState('');

    const { data, error: manualError, isLoading, mutate } = useManualData();

    if (manualError) {
        return <div>{error}</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const resetForm = () => {
        setSelectedInstitution('');
        setNewInstitution('');
        setAccountName('');
        setBalance('');
        setSelectedAccountType('');
        setError('');
    }

    const handleInstitutionChange = (e) => {
        const value = e.target.value;
        setSelectedInstitution(value);
    }

    const handleAccountNameChange = (e) => {
        setAccountName(e.target.value);
    }

    const handleBalanceChange = (e) => {
        setBalance(e.target.value);
    }

    const handleAccountTypeChange = (e) => {
        setSelectedAccountType(e.target.value);
    }

    const handleAddAccountSubmit = async (formData) => {
        try {
            await createManualAccount(formData);
            mutate();
        } catch (e) {
            console.log(e);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const institutionExists = data.some(
            (institution) => institution.name.toLowerCase() === newInstitution.toLowerCase()
        )

        if (institutionExists) {
            setError(`The institution '${newInstitution}' already exists.`);
            return;
        }

        if (!balance) {
            setBalance('0');
        }

        const formData = {
            institutionName: selectedInstitution === 'create' ? newInstitution : selectedInstitution,
            type: selectedAccountType.toUpperCase(),
            name: accountName,
            balance: Number(balance).toFixed(2)
        }

        handleAddAccountSubmit(formData);
        resetForm();
        onClose();
    }

    return (
        <Modal centered show={show} onHide={onClose}>
            <Modal.Header className='contrast-heading' closeButton>
                <Modal.Title className='fw-bold fs-3 text-uppercase'>Add Account</Modal.Title>
            </Modal.Header>
            <Modal.Body className='container-background rounded nav-text fw-semibold'>
                <Form onSubmit={handleSubmit}>
                    {error && <p className='text-danger'>{error}</p>}
                    <div className='row mb-4'>
                        <Form.Group controlId='institution' className='col'>
                            <Form.Label>Institution<span className='red-text'>*</span></Form.Label>
                            <Form.Select value={selectedInstitution} onChange={handleInstitutionChange} required>
                                <option value=''>Select an institution</option>
                                {data.map((manualInstitution) => (
                                    <option key={manualInstitution.id} value={manualInstitution.name}>
                                        {manualInstitution.name}
                                    </option>
                                ))}
                                <option value='create'>Create new institution</option>
                            </Form.Select>
                            {selectedInstitution === 'create' && (
                                <Form.Control
                                    type='text'
                                    placeholder='Enter institution name'
                                    value={newInstitution}
                                    onChange={(e) => setNewInstitution(e.target.value)}
                                    required
                                />
                            )}
                        </Form.Group>
                        <Form.Group controlId='accountType' className='col'>
                            <Form.Label>Account Type <span className='red-text'>*</span></Form.Label>
                            <Form.Select value={selectedAccountType} onChange={handleAccountTypeChange} required>
                                <option value=''>Select an account type</option>
                                <option value='Depository'>Cash</option>
                                <option value='Credit'>Credit</option>
                                <option value='Investment'>Investment</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className='row mb-2'>
                        <Form.Group controlId='accountName' className='col'>
                            <Form.Label>Account<span className='red-text'>*</span></Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Name'
                                value={accountName}
                                onChange={handleAccountNameChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId='balance' className='col'>
                            <Form.Label>Initial Balance</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Amount'
                                value={balance}
                                onChange={handleBalanceChange}
                            />
                        </Form.Group>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button id='acct-add-btn' className='btn-md mt-2' type='submit'>
                            Add
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddAccountForm;
