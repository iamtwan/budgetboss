import React from 'react';
import useAccounts from '@/hooks/useAccounts';
import AccountsList from '../AccountsList';

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
        <AccountsList
            accounts={accounts}
            handleAccountClick={handleAccountClick}
            formatCurrency={formatCurrency}
            manualData={manualData}
            type='investment'
            title='Investment Accounts'
            showTransactions={false}
        // selectedAccount={selectedAccount}
        // setManualData={setManualData}
        // handleCloseModal={handleCloseModal}
        />
    );
};

export default InvestmentAccountsPage;
