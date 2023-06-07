import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateManualAccount, deleteManualAccount } from '../../../services/apiService';

const EditAccountModal = ({ show, account, onClose, onAccountUpdate, onAccountDelete, onSubmitSuccess }) => {
    const [accountName, setAccountName] = useState('');
    const [balance, setBalance] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (account) {
            setAccountName(account.name);
            setBalance(account.balance.toString());
        }
    }, [account]);

    const handleAccountNameChange = (e) => {
        setAccountName(e.target.value);
    };

    const handleBalanceChange = (e) => {
        setBalance(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            const formData = {
                id: account.id,
                name: accountName,
                balance: parseFloat(balance),
            };

            await updateManualAccount(account.id, formData);

            onAccountUpdate({ id: account.id, ...formData });
            onClose();
            onSubmitSuccess();
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteManualAccount(account.id);

            onAccountDelete(account.id);
            onClose();
            onSubmitSuccess();
        } catch (err) {
            setError(err.message);
        }
    };

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
                <Button variant="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditAccountModal;
