import React, { useState } from 'react';
import TransactionListModal from '../../Transactions/TransactionModals/TransactionListModal';
import { resetItem, fireEvent } from '../../../../services/apiWebhooks';
import useAccounts from '@/hooks/useAccounts';

const CashAccountsPage = ({ linkedCash, manualData, setManualData, onOpenEditModal }) => {
    const [selectedAccount, setSelectedAccount] = useState(null);
    const { mergeAccounts } = useAccounts();

    const accounts = mergeAccounts(linkedCash, manualData.cash, "cash");

    const handleAccountTransactionsClick = async (institutionId, account, type) => {
        try {
            setSelectedAccount({ institutionId, ...account, type });
        } catch (err) {
            console.log(err);
        }
    };

    const handleAccountClick = (account) => {
        if (account.accountType === "linked") return;

        onOpenEditModal(account);
    };

    const handleCloseModal = () => {
        setSelectedAccount(null);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const handleReset = async (id) => {
        try {
            await resetItem(id);
        } catch (err) {
            console.log(err)
        }
    };

    const handleFireEvent = async (id) => {
        try {
            await fireEvent(id);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="col border m-2">
            <h4 className="text-uppercase text-info">Cash Accounts</h4>
            {
                accounts.map(institution => {
                    return institution.accounts.length > 0 && (
                        <ul className="list-group list-group-flush" key={institution.name}>
                            <h5 className="fw-bolder text-uppercase">{institution.name}</h5>
                            {institution.accounts.map((account) => (
                                <li className="d-flex flex-column mb-2" key={account.key}>
                                    <div
                                        style={{ cursor: "pointer" }}
                                        className="d-shrink-1"
                                        onClick={() => handleAccountClick(account)}
                                    >
                                        <div className="d-flex justify-content-between w-100">
                                            <p className="fw-bolder m-0 p-0 text-primary">{account.name}</p>
                                            <p
                                                className={`m-0 p-0 ${account.balance < 0
                                                    ? 'text-danger'
                                                    : 'text-success'
                                                    } fw-bold`}
                                            >
                                                {account.balance < 0 ? '-' : ''}
                                                {formatCurrency(Math.abs(account.balance))}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ms-3">
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
                                        {/* <button onClick={() => handleReset(account.id)}>Reset</button>
                                        <button onClick={() => handleFireEvent(account.id)}>Fire Webhook Event</button> */}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                })
            }
            {selectedAccount && (
                <TransactionListModal
                    account={selectedAccount}
                    onClose={handleCloseModal}
                    manualData={manualData}
                    setManualData={setManualData}
                    type="cash"
                />
            )}
        </div>
    );
};

export default CashAccountsPage;
