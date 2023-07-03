'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateManualAccount, deleteManualAccount } from '../../../../services/apiService';
import { useSWRConfig } from 'swr';

const EditAccountModal = ({ show, account, onClose }) => {
    const [accountName, setAccountName] = useState('');
    const [balance, setBalance] = useState('');
    const [error, setError] = useState('');

    const { mutate } = useSWRConfig();

    useEffect(() => {
        if (account) {
            setAccountName(account.name);
            setBalance(account.balance.toString());
        }
    }, [account]);

    const handleAccountNameChange = (e) => {
        setAccountName(e.target.value);
    }

    const handleBalanceChange = (e) => {
        setBalance(e.target.value);
    }

    const updateManualAccounts = async (accountUpdate) => {
        try {
            mutate('http://localhost:8080/api/manual-institutions', accountUpdate, {
                populateCache: (account, institutions) => {
                    const updatedInstitutions = institutions.map(institution => {
                        const updatedManualAccounts = institution.manualAccounts.map(acc => acc.id === account.id ? account : acc);
                        return { ...institution, manualAccounts: updatedManualAccounts };
                    });

                    return updatedInstitutions;
                },
                revalidate: false,
            });

            onClose();
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }

    const handleEdit = () => {
        const formData = {
            id: account.id,
            name: accountName,
            balance: parseFloat(balance),
        };

        updateManualAccounts(() => updateManualAccount(account.id, formData));
    }

    const handleDelete = () => {
        updateManualAccounts(() => deleteManualAccount(account.id));
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {error && <p className="text-danger">{error}</p>}
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
                            placeholder="Enter balance"
                            value={balance}
                            onChange={handleBalanceChange}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
                <Button variant="primary" onClick={handleEdit}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditAccountModal;
