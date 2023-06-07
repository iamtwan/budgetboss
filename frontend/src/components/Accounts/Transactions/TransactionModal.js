import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TransactionView from './TransactionView';
import AddTransactionForm from './AddTransactionForm';
import {
    fetchLinkedTransactions,
    fetchManualTransactions,
    createManualTransaction,
    deleteManualTransaction,
    updateManualTransaction
} from '../../../utils/apiService';

const TransactionModal = ({ account, onClose, manualData, setManualData, type }) => {
    const [showModal, setShowModal] = useState(true);
    const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);
    const [selectedTransactions, setSelectedTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);

            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));

                let response = null;
                const accountType = account.type;

                if (accountType === "linked") {
                    response = await fetchLinkedTransactions(account.id);
                } else if (accountType === "manual") {
                    response = await fetchManualTransactions(account.id);
                } else {
                    throw new Error("Unknown account type");
                }

                setTransactions(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, [account]);

    const handleCloseModal = () => {
        setShowModal(false);
        onClose();
    };

    const handleShowAddTransactionForm = () => {
        setShowAddTransactionForm(true);
    };

    const handleHideAddTransactionForm = () => {
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
                                return { ...account, balance: account.balance - response.data.amount };
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
        setShowAddTransactionForm(true);
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
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
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
                {showAddTransactionForm && (
                    <AddTransactionForm
                        account={account}
                        transaction={selectedTransactionId ? transactions.find(t => t.id === selectedTransactionId) : null}
                        onClose={handleHideAddTransactionForm}
                        onSubmit={handleAddTransaction}
                        show={showAddTransactionForm}
                    />
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
    );
};

export default TransactionModal;
