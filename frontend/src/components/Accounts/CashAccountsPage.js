import React, { useState } from 'react';
import TransactionModal from './Transactions/TransactionModal';
import axios from 'axios';

const CashAccountsPage = ({ depositories, manualCash }) => {
    const [selectedAccount, setSelectedAccount] = useState(null);

    const handleAccountClick = async (account, type) => {
        console.log(type);
        try {
            let url = "";
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

            console.log(response);

            setSelectedAccount({ ...account, type: type });
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
                institution.accounts.length > 0 && (
                    <ul className="list-group list-group-flush" key={institution.id}>
                        <h5 className="fw-bolder text-uppercase text-primary">{institution.name}</h5>
                        {institution.accounts.map((account) => (
                            <li className="d-flex flex-column" key={account.id}>
                                <div className="d-shrink-1">
                                    <div className="d-flex justify-content-between w-100">
                                        <p className="fw-bolder m-0 p-0">{account.name}</p>
                                        <p
                                            className={`m-0 p-0 ${account.balances && account.balances.current < 0
                                                ? 'text-danger'
                                                : 'text-success'
                                                } fw-bold`}
                                        >
                                            {account.balances && account.balances.current !== undefined
                                                ? account.balances.current < 0
                                                    ? '-'
                                                    : ''
                                                : ''}
                                            $
                                            {formatCurrency(
                                                Math.abs(
                                                    account.balances ? account.balances.current : 0
                                                )
                                            )}
                                        </p>
                                    </div>
                                    <p className="ms-3">
                                        <a
                                            className="text-secondary link-offset-2 link-underline link-underline-opacity-0 m-0 p-0"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAccountClick(account, "linked");
                                            }}
                                        >
                                            Transactions
                                        </a>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )
            ))}

            {manualCash.map((manualInstitution) => (
                manualInstitution.accounts.length > 0 && (
                    <ul className="list-group list-group-flush" key={manualInstitution.id}>
                        <h5 className="fw-bolder text-uppercase text-primary">{manualInstitution.name}</h5>
                        {manualInstitution.accounts.map((manualAccount) => (
                            <li className="d-flex flex-column" key={manualAccount.id}>
                                <div className="d-shrink-1">
                                    <div className="d-flex justify-content-between w-100">
                                        <p className="fw-bolder m-0 p-0">{manualAccount.name}</p>
                                        <p
                                            className={`m-0 p-0 ${manualAccount.balance < 0 ? 'text-danger' : 'text-success'
                                                } fw-bold`}
                                        >
                                            {manualAccount.balance < 0 ? '-' : ''}
                                            ${formatCurrency(Math.abs(manualAccount.balance))}
                                        </p>
                                    </div>
                                    <p className="ms-3">
                                        <a
                                            className="text-secondary link-offset-2 link-underline link-underline-opacity-0 m-0 p-0"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAccountClick(manualAccount, "manual");
                                            }}
                                        >
                                            Transactions
                                        </a>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )
            ))}

            {selectedAccount && (
                <TransactionModal
                    account={selectedAccount}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );


};

export default CashAccountsPage;