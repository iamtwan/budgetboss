import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TransactionView from './TransactionView';
import AddTransactionForm from './AddTransactionForm';
import axios from 'axios';

const TransactionModal = ({ account, onClose }) => {
    const [showModal, setShowModal] = useState(true);
    const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
        onClose();
    };

    const handleShowAddTransactionForm = () => {
        setShowAddTransactionForm(true);
    };

    const handleHideAddTransactionForm = () => {
        setShowAddTransactionForm(false);
    };

    const handleAddTransaction = async (formData) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/manual-transactions/${account.id}`, formData, {
                withCredentials: true,
            });

            console.log('Transaction added:', response.data);

        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{account?.name} Transactions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <Button onClick={handleShowAddTransactionForm}>Add Transaction</Button>
                </div>
                {showAddTransactionForm && (
                    <AddTransactionForm account={account} onClose={handleHideAddTransactionForm} onSubmit={handleAddTransaction} />
                )}
                <TransactionView account={account} type={account.type} />
            </Modal.Body>
        </Modal>
    );
};

export default TransactionModal;
