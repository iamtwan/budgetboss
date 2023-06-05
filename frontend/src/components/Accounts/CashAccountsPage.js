import React, { useState } from 'react';
import TransactionModal from './Transactions/TransactionModal';

const CashAccountsPage = ({ linkedCash, manualData, setManualData }) => {
    const [selectedAccount, setSelectedAccount] = useState(null);

    const handleAccountTransactionsClick = (institutionId, account, type) => {
        setSelectedAccount({ institutionId, ...account, type });
    };

    const handleCloseModal = () => {
        setSelectedAccount(null);
    };

    const formatCurrency = (value) => {
        return value.toFixed(2);
    };

    const mergeAccounts = () => {
        const mergedAccounts = {};

        linkedCash.forEach((institution) => {
            institution.accounts.forEach((account) => {
                const institutionName = institution.name.toLowerCase();
                if (!mergedAccounts[institutionName]) {
                    mergedAccounts[institutionName] = {
                        name: institution.name,
                        accounts: [],
                    };
                }
                mergedAccounts[institutionName].accounts.push({
                    id: account.id,
                    name: account.name,
                    balances: account.balances,
                    type: 'linked',
                });
            });
        });

        manualData.cash.forEach((manualInstitution) => {
            manualInstitution.accounts.forEach((manualAccount) => {
                const institutionName = manualInstitution.name.toLowerCase();
                if (!mergedAccounts[institutionName]) {
                    mergedAccounts[institutionName] = {
                        name: manualInstitution.name,
                        accounts: [],
                    };
                }
                mergedAccounts[institutionName].accounts.push({
                    id: manualAccount.id,
                    name: manualAccount.name,
                    balance: manualAccount.balance,
                    type: 'manual',
                });
            });
        });

        return Object.values(mergedAccounts);
    };

    const renderAccountList = (institution) => {
        return (
            <ul className="list-group list-group-flush" key={institution.name}>
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
                                    ${formatCurrency(
                                        Math.abs(
                                            account.balances ? account.balances.current : account.balance
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
                                        handleAccountTransactionsClick(
                                            institution.id,
                                            account,
                                            account.type
                                        );
                                    }}
                                >
                                    Transactions
                                </a>
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="col border m-2">
            <h4 className="text-uppercase text-info">Cash Accounts</h4>
            {mergeAccounts().map((institution) =>
                institution.accounts.length > 0 && renderAccountList(institution)
            )}
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
