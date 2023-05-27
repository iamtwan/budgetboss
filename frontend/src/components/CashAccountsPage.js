import React from 'react';

const CashAccountsPage = ({ depositories }) => {
    return (
        <div className="col border m-2">
            <h4 className="text-uppercase text-primary">Cash Accounts</h4>
            {depositories.map(institution => {
                return <ul className="list-group list-group-flush list-unstyled" key={institution.id}>
                    <h5 className="fw-bolder text-uppercase">{institution.name}</h5>
                    {institution.accounts.map(account => {
                        return <li className="list-group-item" key={account.accountId}>
                            <div className="d-flex justify-content-between ms-3 mb-n1">
                                <p className="fw-bolder mb-1">{account.name}</p>
                                <p className="me-4">-</p>
                                <p>{account.balances.current}</p>
                            </div>
                        </li>
                    })}
                </ul>
            })}
        </div>
    );
};

export default CashAccountsPage;
