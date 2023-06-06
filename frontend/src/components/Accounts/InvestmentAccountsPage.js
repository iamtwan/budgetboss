import React from 'react';

const InvestmentAccountsPage = ({ linkedInvestment, manualData }) => {
    const formatCurrency = (value) => {
        return value.toFixed(2);
    };

    const mergeAccounts = () => {
        const mergedAccounts = {};

        linkedInvestment.forEach(institution => {
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

        manualData.investment.forEach(institution => {
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
            <h4 className="text-uppercase text-info">Investment Accounts</h4>
            {
                mergeAccounts().map(institution => {
                    return institution.accounts.length > 0 && (
                        <ul className="list-group list-group-flush" key={institution.name}>
                            <h5 className="fw-bolder text-uppercase text-primary">{institution.name}</h5>
                            {institution.accounts.map((account) => (
                                <li className="d-flex flex-column mb-2" key={account.key}>
                                    <div className="d-shrink-1">
                                        <div className="d-flex justify-content-between w-100">
                                            <p className="fw-bolder m-0 p-0">{account.name}</p>
                                            <p
                                                className={`m-0 p-0 ${account.balance < 0
                                                    ? 'text-danger'
                                                    : 'text-success'
                                                    } fw-bold`}
                                            >
                                                {account.balance < 0 ? '-' : ''}
                                                $
                                                {formatCurrency(Math.abs(account.balance))}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                })
            }
        </div>
    );
};

export default InvestmentAccountsPage;
