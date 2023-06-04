import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TransactionView from './TransactionView';
import AddTransactionForm from './AddTransactionForm';
import { fetchLinkedTransactions, fetchManualTransactions, createManualTransaction } from '../../../utils/apiService';

const TransactionModal = ({ account, onClose, manualData, setManualData }) => {
    const [showModal, setShowModal] = useState(true);
    const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);

            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));

                let response = null;
                const type = account.type

                if (type === "linked") {
                    response = await fetchLinkedTransactions(account.id);
                } else if (type === "manual") {
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
    };

    const handleAddTransaction = async (formData) => {
        try {
            const response = await createManualTransaction(account.id, formData);

            if (manualData.cash) {
                const newManualCash = manualData.cash.map(institution => {
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
                    cash: newManualCash
                }));
            } else {
                const newManualCredit = manualData.credit.map(institution => {
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
                    credit: newManualCredit
                }));
            }

            setTransactions([...transactions, response.data]);
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    return (
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{account.name} Transactions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <Button onClick={handleShowAddTransactionForm}>Add Transaction</Button>
                </div>
                {showAddTransactionForm && (
                    <AddTransactionForm account={account} onClose={handleHideAddTransactionForm} onSubmit={handleAddTransaction} show={showAddTransactionForm} />
                )}
                <TransactionView transactions={transactions} isLoading={isLoading} />
            </Modal.Body>
        </Modal>
    );
};

export default TransactionModal;
