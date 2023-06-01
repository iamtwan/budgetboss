import React, { useState } from 'react';
import TransactionModal from './Transactions/TransactionModal';
import axios from 'axios';

const CashAccountsPage = ({ depositories }) => {
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [transactions, setTransactions] = useState([]);

    const handleAccountClick = async (account) => {
        try {
            console.log("Account ID:", account.id);
            const response = await axios.get(`http://localhost:8080/api/transactions/${account.id}`, {
                withCredentials: true,
            });

            console.log(response)

            const fetchedTransactions = response.data;
            setTransactions(fetchedTransactions);
            setSelectedAccount(account);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCloseModal = () => {
        setSelectedAccount(null);
    };

    const formatCurrency = (value) => {
        return value.toFixed(2);
    };

    return (
        <div className="col border m-2">
            <h4 className="text-uppercase text-info">Cash Accounts</h4>
            {depositories.map((institution) => (
                <ul className="list-group list-group-flush" key={institution.id}>
                    <h5 className="fw-bolder text-uppercase text-primary">{institution.name}</h5>
                    {institution.accounts.map((account) => (
                        <li className="d-flex flex-column" key={account.id}>
                            <div className="d-shrink-1">
                                <div className="d-flex justify-content-between w-100">
                                    <p className="fw-bolder m-0 p-0">{account.name}</p>
                                    <p className={`m-0 p-0 ${account.balances.current < 0 ? 'text-danger' : 'text-success'} fw-bold`}>
                                        {account.balances.current < 0 ? '-' : ''}${formatCurrency(Math.abs(account.balances.current))}
                                    </p>
                                </div>
                                <p className="ms-3">
                                    <a className="text-secondary link-offset-2 link-underline link-underline-opacity-0 m-0 p-0" href="#" onClick={() => handleAccountClick(account)}>Transactions</a>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ))}

            {selectedAccount && (
                <TransactionModal account={selectedAccount} transactions={transactions} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default CashAccountsPage;
