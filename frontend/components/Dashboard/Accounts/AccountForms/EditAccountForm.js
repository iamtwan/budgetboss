'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateManualAccount, deleteManualAccount } from '../../../../services/apiService';
import { useSWRConfig } from 'swr';
import { API_BASE_URL } from 'services/apiConfig';


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
            mutate(`${API_BASE_URL}/manual-institutions`, accountUpdate, {
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
            setError(error.message);
        }
    }

    const handleEdit = () => {
        const formData = {
            id: account.id,
            name: accountName,
            balance: Number(balance).toFixed(2),
        };

        updateManualAccounts(() => updateManualAccount(account.id, formData));
    }

    const handleDelete = async () => {
        try {
            await deleteManualAccount(account.id);

            mutate(`${API_BASE_URL}/manual-institutions`, (data) => {
                return data.map(institution => {
                    const updatedManualAccounts = institution.manualAccounts.filter(acc => acc.id !== account.id);
                    return { ...institution, manualAccounts: updatedManualAccounts };
                });
            }, false);

            onClose();
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <Modal centered show={show} onHide={onClose}>
            <Modal.Header className='contrast-heading' closeButton>
                <Modal.Title>Edit Account</Modal.Title>
            </Modal.Header>
            <Modal.Body className='container-background rounded nav-text fw-semibold'>
                <Form>
                    {error && <p className='text-danger'>{error}</p>}
                    <div className='row mb-4'>
                        <Form.Group controlId='accountName' className='col'>
                            <Form.Label>Account Name<span className='red-text'>*</span></Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter account name'
                                value={accountName}
                                onChange={handleAccountNameChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId='balance' className='col'>
                            <Form.Label>New Balance<span className='red-text'>*</span></Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter balance'
                                value={balance}
                                onChange={handleBalanceChange}
                                required
                            />
                        </Form.Group>
                    </div>
                    <div className='d-flex justify-content-end mt-2'>
                        <Button id='acct-edit-btn' className='me-2' variant='primary' onClick={handleEdit}>
                            Update
                        </Button>
                        <Button id='acct-delete' variant='danger' onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal >
    );
}

export default EditAccountModal;
