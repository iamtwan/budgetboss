import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TransactionView from '../TransactionView/TransactionView';
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

    console.log("Transactions: ", transactions, "for account: ", account);

    const handleCloseModal = () => {
        setShowModal(false);
        onClose();
    };

    const handleShowAddTransactionForm = () => {
        setShowTransactionList(false);
        setShowAddTransactionForm(true);
        setIsEditingTransaction(false);
    };

    const handleShowEditTransactionForm = () => {
        setShowTransactionList(false);
        setShowAddTransactionForm(true);
        setIsEditingTransaction(true);
    };

    const handleHideAddTransactionForm = () => {
        setShowTransactionList(true);
        setShowAddTransactionForm(false);
        setSelectedTransactionId(null);
    };

    const isLinkedAccount = account.type === "linked";

    const handleTransactionClick = (transactionId) => {
        if (isLinkedAccount) return;

        setSelectedTransactionId(transactionId);
        handleShowEditTransactionForm();
    };

    const handleDeleteSelected = async () => {
        try {
            selectedTransactions.forEach(async (transactionId) => {
                await deleteManualTransaction(transactionId);

                mutate();
            });

            // setTransactions(transactions.filter(t => !selectedTransactions.includes(t.id)));
            setSelectedTransactions([]);
        } catch (error) {
            console.error('Error deleting transaction:', error)
        }
    };

    const handleSelectTransaction = (transactionId) => {
        if (selectedTransactions.includes(transactionId)) {
            setSelectedTransactions(selectedTransactions.filter(id => id !== transactionId));
        } else {
            setSelectedTransactions([...selectedTransactions, transactionId]);
        }
    };

    return (
        <>
            <Modal show={showModal && showTransactionList} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{account.name} Transactions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!isLinkedAccount && (
                        <div className="mb-3">
                            <Button onClick={handleShowAddTransactionForm}>Add Transaction</Button>
                            <Button variant="danger" onClick={handleDeleteSelected}>Delete Selected</Button>
                        </div>
                    )}
                        <TransactionView
                            transactions={transactions}
                            onTransactionClick={handleTransactionClick}
                            selectedTransactions={selectedTransactions}
                            handleSelectTransaction={handleSelectTransaction}
                        />
                    {/* {Array.isArray(transactions) && transactions.length > 0 &&
                    } */}
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
};

export default TransactionListModal;
