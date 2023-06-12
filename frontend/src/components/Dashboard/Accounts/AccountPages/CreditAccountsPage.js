import React, { useState } from 'react';
import useAccounts from '@/hooks/useAccounts';
import AccountsList from '../AccountsList';

const CreditAccountsPage = ({ linkedCredit, manualData, setManualData, onOpenEditModal }) => {
    const [selectedAccount, setSelectedAccount] = useState(null);
    const { mergeAccounts } = useAccounts();

    const institutions = mergeAccounts(linkedCredit, manualData.credit, "credit");

    const handleAccountTransactionsClick = async (institutionId, account, type) => {
        try {
            setSelectedAccount({ institutionId, ...account, type });
        } catch (err) {
            console.log(err);
        }
    };

    const handleAccountClick = (account) => {
        if (account.accountType === "linked") return;

        onOpenEditModal(account);
    };

    const handleCloseModal = () => {
        setSelectedAccount(null);
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    return (
        <AccountsList
            institutions={institutions}
            selectedAccount={selectedAccount}
            handleAccountClick={handleAccountClick}
            handleAccountTransactionsClick={handleAccountTransactionsClick}
            formatCurrency={formatCurrency}
            manualData={manualData}
            setManualData={setManualData}
            handleCloseModal={handleCloseModal}
            type='credit'
            title='Credit Accounts'
        />
    );
};

export default CreditAccountsPage;
