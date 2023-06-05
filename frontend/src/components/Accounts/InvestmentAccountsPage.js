import React from 'react';

const InvestmentAccountsPage = ({ linkedInvestment, manualData }) => {
    const formatCurrency = (value) => {
        return value.toFixed(2);
    };

    const mergeAccounts = () => {
        const mergedAccounts = {};

        linkedInvestment.forEach((institution) => {
            const institutionName = institution.name.toLowerCase();
            if (!mergedAccounts[institutionName]) {
                mergedAccounts[institutionName] = {
                    name: institution.name,
                    accounts: [],
                };
            }
            institution.accounts.forEach((account) => {
                mergedAccounts[institutionName].accounts.push({
                    id: account.id,
                    name: account.name,
                    balances: account.balances,
                    type: 'linked',
                });
            });
        });

        manualData.investment.forEach((manualInstitution) => {
            const institutionName = manualInstitution.name.toLowerCase();
            if (!mergedAccounts[institutionName]) {
                mergedAccounts[institutionName] = {
                    name: manualInstitution.name,
                    accounts: [],
                };
            }
            manualInstitution.accounts.forEach((manualAccount) => {
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
                    <li className="d-flex flex-column mb-2" key={account.id}>
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
                                    Math.abs(account.balances ? account.balances.current : account.balance)
                                )}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="col border m-2">
            <h4 className="text-uppercase text-info">Investment Accounts</h4>
            {mergeAccounts().map((institution) =>
                institution.accounts.length > 0 && renderAccountList(institution)
            )}
        </div>
    );
};

export default InvestmentAccountsPage;
