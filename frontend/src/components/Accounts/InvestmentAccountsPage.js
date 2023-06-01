import React from 'react';

const InvestmentAccountsPage = ({ investmentAccounts }) => {
    const formatCurrency = (value) => {
        return value.toFixed(2);
    };

    return (
        <div className="col border m-2">
            <h4 className="text-uppercase text-info">Investment Accounts</h4>
            {investmentAccounts.map((institution) => (
                <ul className="list-group list-group-flush list-unstyled text-primary" key={institution.id}>
                    <h5 className="fw-bolder text-uppercase m-0 p-0">{institution.name}</h5>
                    {institution.accounts.map((account) => (
                        <li className="list-group-item" key={account.id}>
                            <div className="d-flex justify-content-between w-100">
                                <p className="fw-bolder m-0 p-0">{account.name}</p>
                                <p className={`m-0 p-0 ${account.balances.current < 0 ? 'text-danger' : 'text-success'} fw-bold`}>
                                    {account.balances.current < 0 ? `-$${formatCurrency(Math.abs(account.balances.current))}` : `$${formatCurrency(account.balances.current)}`}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    );
};

export default InvestmentAccountsPage;
