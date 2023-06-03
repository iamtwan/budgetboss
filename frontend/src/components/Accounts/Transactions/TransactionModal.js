import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TransactionView from './TransactionView';
import AddTransactionForm from './AddTransactionForm';
import axios from 'axios';

const TransactionModal = ({ account, onClose, manualCash, setManualCash }) => {
    const [showModal, setShowModal] = useState(true);
    const [showAddTransactionForm, setShowAddTransactionForm] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);

            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));

                let url = "";
                const type = account.type

                if (type === "linked") {
                    url = `http://localhost:8080/api/transactions/${account.id}`;
                } else if (type === "manual") {
                    url = `http://localhost:8080/api/manual-transactions/${account.id}`;
                } else {
                    throw new Error("Unknown account type");
                }

                const response = await axios.get(url, {
                    withCredentials: true,
                });

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
            const response = await axios.post(`http://localhost:8080/api/manual-transactions/${account.id}`, formData, {
                withCredentials: true,
            });

            const newManualCash = manualCash.map(institution => {
                if (institution.id === account.institutionId) {
                    return {
                        ...institution,
                        accounts: institution.accounts.map(acc => {
                        if (acc.id === account.id) {
                            return {...account, balance: account.balance - response.data.amount};
                        }
                        return acc;
                    })};
                }
                return institution;
              });

            setManualCash(newManualCash);
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
                <TransactionView account={account} type={account.type} transactions={transactions} isLoading={isLoading} />
            </Modal.Body>
        </Modal>
    );
};

export default TransactionModal;
