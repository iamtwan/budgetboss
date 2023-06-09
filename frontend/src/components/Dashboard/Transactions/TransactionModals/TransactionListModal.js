import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TransactionView from '../TransactionView/TransactionView';
import TransactionModal from './TransactionModal';
import useTransactions from '../../../../hooks/useTransactions';
import {
    createManualTransaction,
    deleteManualTransaction,
    updateManualTransaction
} from '../../../../services/apiService';

const TransactionListModal = ({ account, onClose, manualData, setManualData, type }) => {
    const [showModal, setShowModal] = useState(true);
    const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);
    const [selectedTransactions, setSelectedTransactions] = useState([]);
    const { transactions, isLoading, setTransactions } = useTransactions(account);
    const [isAddingTransaction, setIsAddingTransaction] = useState(false);
    const [isEditingTransaction, setIsEditingTransaction] = useState(false);
    const [showTransactionList, setShowTransactionList] = useState(true);


    const handleCloseModal = () => {
        setShowModal(false);
        onClose();
    };

    const handleShowAddTransactionForm = () => {
        setShowTransactionList(false);
        setShowAddTransactionForm(true);
        setIsAddingTransaction(true);
        setIsEditingTransaction(false);
    };

    const handleShowEditTransactionForm = () => {
        setShowTransactionList(false);
        setShowAddTransactionForm(true);
        setIsAddingTransaction(false);
        setIsEditingTransaction(true);
    };

    const handleHideAddTransactionForm = () => {
        setShowTransactionList(true);
        setShowAddTransactionForm(false);
        setSelectedTransactionId(null);
    };

    const handleAddTransaction = async (formData) => {
        if (selectedTransactionId) {
            handleUpdateTransaction(formData);
            return;
        }

        formData.amount = (formData.type === "Deposit") === (type === "cash") ? -formData.amount : formData.amount;

        try {
            const response = await createManualTransaction(account.id, formData);

            const newManualData = manualData[type].map(institution => {
                if (institution.id === account.institutionId) {
                    return {
                        ...institution,
                        accounts: institution.accounts.map(acc => {
                            if (acc.id === account.id) {
                                return { ...account, balance: acc.balance - response.data.amount };
                            }
                            return acc;
                        })
                    };
                }
                return institution;
            });

            setManualData(prevData => ({
                ...prevData,
                [type]: newManualData
            }));

            setTransactions([...transactions, response.data]);
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
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
            });

            setTransactions(transactions.filter(t => !selectedTransactions.includes(t.id)));
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

    const handleUpdateTransaction = async (formData) => {
        try {
            const response = await updateManualTransaction(selectedTransactionId, formData);

            setTransactions(transactions.map(transaction =>
                transaction.id === selectedTransactionId ? response.data : transaction
            ));

            setSelectedTransactionId(null);
        } catch (error) {
            console.error('Error updating transaction:', error);
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
                        isLoading={isLoading}
                        onTransactionClick={handleTransactionClick}
                        selectedTransactions={selectedTransactions}
                        handleSelectTransaction={handleSelectTransaction}
                    />
                </Modal.Body>
            </Modal>
            {showAddTransactionForm && (
                <TransactionModal
                    account={account}
                    transaction={selectedTransactionId ? transactions.find(t => t.id === selectedTransactionId) : null}
                    onClose={handleHideAddTransactionForm}
                    onSubmit={handleAddTransaction}
                    show={showAddTransactionForm}
                    isAdding={isAddingTransaction}
                    isEditing={isEditingTransaction}
                />
            )}
        </>
    );
};

export default TransactionListModal;
