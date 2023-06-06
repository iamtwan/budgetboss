import React, { useState } from 'react';
import TransactionModal from './Transactions/TransactionModal';

const CreditAccountsPage = ({ linkedCredit, manualData, setManualData }) => {
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

    const mergeAccounts = () => {
        const mergedAccounts = {};

        linkedCredit.forEach(institution => {
            const key = institution.name.toLowerCase();

            mergedAccounts[key] = mergedAccounts[key] || {
                name: institution.name,
                accounts: []
            };

            institution.accounts.forEach(account => {
                mergedAccounts[key].accounts.push({
                    key: 'linked' + account.id,
                    id: account.id,
                    name: account.name,
                    balance: account.balances.current || account.balances.available,
                    type: account.type,
                    accountType: "linked"
                });
            });
        });

        manualData.credit.forEach(institution => {
            const key = institution.name.toLowerCase();

            mergedAccounts[key] = mergedAccounts[key] || {
                name: institution.name,
                accounts: []
            };

            institution.accounts.forEach(account => {
                mergedAccounts[key].accounts.push({
                    key: 'manual' + account.id,
                    id: account.id,
                    name: account.name,
                    balance: account.balance,
                    type: account.type,
                    accountType: "manual"
                });
            });
        });

        return Object.values(mergedAccounts);
    }

    return (
        <div className="col border m-2">
            <h4 className="text-uppercase text-info">Cash Accounts</h4>
            {
                mergeAccounts().map(institution => {
                    return institution.accounts.length > 0 && (
                        <ul className="list-group list-group-flush" key={institution.name}>
                            <h5 className="fw-bolder text-uppercase text-primary">{institution.name}</h5>
                            {institution.accounts.map((account) => (
                                <li className="d-flex flex-column" key={account.key}>
                                    <div className="d-shrink-1">
                                        <div className="d-flex justify-content-between w-100">
                                            <p className="fw-bolder m-0 p-0">{account.name}</p>
                                            <p
                                                className={`m-0 p-0 ${account.balance < 0
                                                    ? 'text-success'
                                                    : 'text-danger'
                                                    } fw-bold`}
                                            >
                                                {account.balance < 0 ? '-' : ''}
                                                $
                                                {formatCurrency(Math.abs(account.balance))}
                                            </p>
                                        </div>
                                        <p className="ms-3">
                                            <a
                                                className="text-secondary link-offset-2 link-underline link-underline-opacity-0 m-0 p-0"
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleAccountTransactionsClick(institution.id, account, account.accountType);
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
                })
            }
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

export default CreditAccountsPage;
