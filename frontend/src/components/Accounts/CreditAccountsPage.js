import React from 'react';

const CreditAccountsPage = ({ creditAccounts }) => {
    return (
        <div className="col border m-2">
            <h4 className="text-uppercase text-primary">Credit Accounts</h4>
            {creditAccounts.map((institution) => (
                <ul className="list-group list-group-flush list-unstyled" key={institution.id}>
                    <h5 className="fw-bolder text-uppercase">{institution.name}</h5>
                    {institution.accounts.map((account) => (
                        <li className="list-group-item" key={account.id}>
                            <div className="d-flex justify-content-between ms-3 mb-n1">
                                <p className="fw-bolder mb-1">{account.name}</p>
                                <p className="m-0 p-0 text-danger fw-bold">${account.balances.current}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
};

export default CreditAccountsPage;
