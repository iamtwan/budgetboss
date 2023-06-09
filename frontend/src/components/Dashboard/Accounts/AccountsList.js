import React from 'react';
import TransactionListModal from '../Transactions/TransactionModals/TransactionListModal';

const AccountsList = ({
    accounts,
    selectedAccount,
    handleAccountClick,
    handleAccountTransactionsClick,
    formatCurrency,
    manualData,
    setManualData,
    handleCloseModal,
    type,
    title,
    showTransactions = true,
}) => {
    return (
        <div className="col border m-2">
            <h4 className="text-uppercase text-info">{title}</h4>
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
                                                    ? (type === 'credit' ? 'text-success' : 'text-danger')
                                                    : (type === 'credit' ? 'text-danger' : 'text-success')
                                                    } fw-bold`}
                                            >
                                                {account.balance < 0 ? '-' : ''}
                                                {formatCurrency(Math.abs(account.balance))}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="ms-3">
                                        {showTransactions && (
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
                                        )}
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
                    type={type}
                />
            )}
        </div>
    );
};

export default AccountsList;
