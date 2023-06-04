import React, { useState } from 'react';
import TransactionModal from './Transactions/TransactionModal';

const CashAccountsPage = ({ linkedCash, manualData, setManualData }) => {
    const [selectedAccount, setSelectedAccount] = useState(null);

    const handleAccountTransactionsClick = async (institutionId, account, type) => {
        try {
            setSelectedAccount({ institutionId, ...account, type });
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
            {linkedCash.map((institution) => (
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
                                                handleAccountTransactionsClick(institution.id, account, "linked");
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

            {manualData.cash.map((manualInstitution) => (
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
                                                handleAccountTransactionsClick(manualInstitution.id, manualAccount, "manual");
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
                    manualData={manualData}
                    setManualData={setManualData}
                />
            )}
        </div>
    );


};

export default CashAccountsPage;
