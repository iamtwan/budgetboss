import React, { useState } from 'react';
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
    };

    const handleAccountNameChange = (e) => {
        setAccountName(e.target.value);
    };

    const handleBalanceChange = (e) => {
        setBalance(e.target.value);
    };

    const handleAccountTypeChange = (e) => {
        setSelectedAccountType(e.target.value);
    };

    const handleAddAccountFormSubmit = async (formData) => {
        try {
            await createManualAccount(formData);
            mutate();
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const institutionExists = data.some(
            (institution) => institution.name.toLowerCase() === newInstitution.toLowerCase()
        );

        if (institutionExists) {
            setError(`The institution '${newInstitution}' already exists.`);
            return;
        }
        const formData = {
            institutionName: selectedInstitution === 'create' ? newInstitution : selectedInstitution,
            type: selectedAccountType.toUpperCase(),
            name: accountName,
            balance: parseFloat(balance),
        };

        handleAddAccountFormSubmit(formData);
        resetForm();
        onClose();
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {error && <p className="text-danger">{error}</p>}
                    <Form.Group controlId="institution">
                        <Form.Label>Institution</Form.Label>
                        <Form.Select value={selectedInstitution} onChange={handleInstitutionChange} required>
                            <option value="">Select an institution</option>
                            {data.map((manualInstitution) => (
                                <option key={manualInstitution.id} value={manualInstitution.name}>
                                    {manualInstitution.name}
                                </option>
                            ))}
                            <option value="create">Create new institution</option>
                        </Form.Select>
                        {selectedInstitution === 'create' && (
                            <Form.Control
                                type="text"
                                placeholder="Enter institution name"
                                value={newInstitution}
                                onChange={(e) => setNewInstitution(e.target.value)}
                                required
                            />
                        )}
                    </Form.Group>
                    <Form.Group controlId="accountType">
                        <Form.Label>Account Type</Form.Label>
                        <Form.Select value={selectedAccountType} onChange={handleAccountTypeChange} required>
                            <option value="">Select an account type</option>
                            <option value="Depository">Cash</option>
                            <option value="Credit">Credit</option>
                            <option value="Investment">Investment</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="accountName">
                        <Form.Label>Account</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter account name"
                            value={accountName}
                            onChange={handleAccountNameChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="balance">
                        <Form.Label>Balance</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter starting balance"
                            value={balance}
                            onChange={handleBalanceChange}
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

export default AddAccountForm;
