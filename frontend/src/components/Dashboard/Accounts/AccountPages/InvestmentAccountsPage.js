import React from 'react';
import useAccounts from '@/hooks/useAccounts';
import AccountsList from '../AccountsList';

const InvestmentAccountsPage = ({ linkedInvestment, manualData, onOpenEditModal }) => {
    const { mergeAccounts } = useAccounts();

    const institutions = mergeAccounts(linkedInvestment, manualData.investment, "investment");

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const handleAccountClick = (account) => {
        if (account.accountType === "linked") return;

        onOpenEditModal(account);
    };

    return (
        <AccountsList
            institutions={institutions}
            handleAccountClick={handleAccountClick}
            formatCurrency={formatCurrency}
            manualData={manualData}
            type='investment'
            title='Investment Accounts'
            showTransactions={false}
        />
    );
};

export default InvestmentAccountsPage;
