import React from 'react';
import useAccounts from '@/hooks/useAccounts';

const InvestmentAccountsPage = ({ linkedInvestment, manualData, onOpenEditModal }) => {
    const { mergeAccounts } = useAccounts();

    const accounts = mergeAccounts(linkedInvestment, manualData.investment, "investment");

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const handleAccountClick = (account) => {
        if (account.accountType === "linked") return;

        onOpenEditModal(account);
    };

    return (
        <div className="col border m-2">
            <h4 className="text-uppercase text-info">Investment Accounts</h4>
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
