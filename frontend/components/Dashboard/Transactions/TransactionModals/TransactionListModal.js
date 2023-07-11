import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TransactionView from '../TransactionView';
import TransactionForm from '../TransactionForm/TransactionForm';
import { useTransactions } from '../../../../services/apiService';
import { deleteManualTransaction } from '../../../../services/apiService';

const TransactionListModal = ({ account, onClose }) => {
    const [showModal, setShowModal] = useState(true);
    const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);
    const [selectedTransactions, setSelectedTransactions] = useState([]);
    const [isEditingTransaction, setIsEditingTransaction] = useState(false);
    const [showTransactionList, setShowTransactionList] = useState(true);

    const { data: transactions, error, isLoading, mutate } = useTransactions(account.type, account.id);

    if (error) {
        return <div>ERROR</div>
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleCloseModal = () => {
        setShowModal(false);
        onClose();
    }

    const handleShowAddTransactionForm = () => {
        setShowTransactionList(false);
        setShowAddTransactionForm(true);
        setIsEditingTransaction(false);
    }

    const handleShowEditTransactionForm = () => {
        setShowTransactionList(false);
        setShowAddTransactionForm(true);
        setIsEditingTransaction(true);
    }

    const handleHideAddTransactionForm = () => {
        setShowTransactionList(true);
        setShowAddTransactionForm(false);
        setSelectedTransactionId(null);
    }

    const isLinkedAccount = account.type === 'linked';

    const handleTransactionClick = (transactionId) => {
        if (isLinkedAccount) return;

        setSelectedTransactionId(transactionId);
        handleShowEditTransactionForm();
    }

    const handleDeleteSelected = async () => {
        try {
            selectedTransactions.forEach(async (transactionId) => {
                await deleteManualTransaction(transactionId);

                mutate();
            });

            setSelectedTransactions([]);
        } catch (error) {
            console.error('Error deleting transaction:', error)
        }
    }

    const handleSelectTransaction = (transactionId) => {
        if (selectedTransactions.includes(transactionId)) {
            setSelectedTransactions(selectedTransactions.filter(id => id !== transactionId));
        } else {
            setSelectedTransactions([...selectedTransactions, transactionId]);
        }
    }

    return (
        <>
            <Modal show={showModal && showTransactionList} onHide={handleCloseModal} size='xl' centered>
                <Modal.Header closeButton className='nav-text container-background'>
                    <Modal.Title className='text-uppercase fs-2 w-100 text-center fw-bold'>{account.name} Transactions</Modal.Title>
                </Modal.Header>
                <Modal.Body className='rounded container-background'>
                    {!isLinkedAccount && (
                        <div className='mb-3 container d-flex justify-content-between'>
                            <Button id='btn-edit' className='btn-sm' onClick={handleShowAddTransactionForm}>Add Transaction</Button>
                            <Button id='btn-delete' className='btn-sm' variant='danger' onClick={handleDeleteSelected}>Delete Selected</Button>
                        </div>
                    )}
                    <TransactionView
                        transactions={transactions}
                        onTransactionClick={handleTransactionClick}
                        selectedTransactions={selectedTransactions}
                        handleSelectTransaction={handleSelectTransaction}
                    />
                </Modal.Body>
            </Modal>
            {showAddTransactionForm && (
                <TransactionForm
                    account={account}
                    transaction={selectedTransactionId ? transactions.find(t => t.id === selectedTransactionId) : null}
                    onClose={handleHideAddTransactionForm}
                    show={showAddTransactionForm}
                    isEditing={isEditingTransaction}
                />
            )}
        </>
    );
}

export default TransactionListModal;
