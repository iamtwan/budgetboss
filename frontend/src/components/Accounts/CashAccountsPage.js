import React, { useState } from 'react';
import TransactionModal from './Transactions/TransactionModal';

const CashAccountsPage = ({ depositories }) => {
    const [selectedAccount, setSelectedAccount] = useState(null);

    const handleAccountClick = (account) => {
        setSelectedAccount(account);
    };

    const handleCloseModal = () => {
        setSelectedAccount(null);
    };

    return (
        <div className="col border m-2">
            <h4 className="text-uppercase text-primary">Cash Accounts</h4>
            {depositories.map((institution) => (
                <ul className="list-group list-group-flush" key={institution.id}>
                    <h5 className="fw-bolder text-uppercase">{institution.name}</h5>
                    {institution.accounts.map((account) => (
                        <li className="d-flex flex-column" key={account.id}>
                            <div className="d-shrink-1">
                                <div className="d-flex justify-content-between w-100">
                                    <p className="fw-bolder m-0 p-0">{account.name}</p>
                                    <p className="m-0 p-0 text-success fw-bold">${account.balances.current}</p>
                                </div>
                                <p className="m-1">
                                    <a className="link-offset-2 link-underline link-underline-opacity-0 m-0 p-0" href="#" onClick={() => handleAccountClick(account)}>Transactions</a>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ))}

            {selectedAccount && (
                <TransactionModal account={selectedAccount} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default CashAccountsPage;
