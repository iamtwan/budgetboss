import React from 'react';

const InvestmentAccountsPage = ({ linkedInvestment, manualData }) => {
    const formatCurrency = (value) => {
        return value.toFixed(2);
    };

    return (
        <div className="col border m-2">
            <h4 className="text-uppercase text-info">Investment Accounts</h4>
            {linkedInvestment.map((institution) => (
                institution.accounts.length > 0 && (
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
                )
            ))}

            {manualData.investment.map((manualInstitution) => (
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
                                            onClick={() => handleAccountClick(manualAccount)}
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

        </div>
    );
};

export default InvestmentAccountsPage;
