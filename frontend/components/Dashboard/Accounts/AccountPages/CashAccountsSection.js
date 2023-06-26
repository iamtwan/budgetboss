'use client';

import React, { useState } from 'react';
import AccountsList from '../AccountsList';
import { useManualData, useLinkedData } from '../../../../services/apiService';
import { mergeAccounts } from '../../../../utils/accountUtils';
import { filterManualAccounts, filterLinkedAccounts } from '../../../../utils/helpers';

const CashAccountsPage = ({ onOpenEditModal }) => {
    const [selectedAccount, setSelectedAccount] = useState(null);

    const { data: manualData, error: manualError, isLoading: manualLoading } = useManualData();
    const { data: linkedData, error: linkedError, isLoading: linkedLoading } = useLinkedData();

    if (manualError || linkedError) {
        return <div>Error...</div>;
    }

    if (manualLoading || linkedLoading) {
        return <div>Loading...</div>;
    }

    const manualCash = filterManualAccounts(manualData, 'DEPOSITORY');
    const linkedCash = filterLinkedAccounts(linkedData, 'DEPOSITORY');
    const institutions = mergeAccounts(linkedCash, manualCash);

    const handleAccountTransactionsClick = async (institutionId, account, type) => {
        try {
            setSelectedAccount({ institutionId, ...account, type });
        } catch (err) {
            console.log(err);
        }
    };

    const handleAccountClick = (account) => {
        if (account.accountType === 'linked') return;

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
            handleCloseModal={handleCloseModal}
            type='cash'
            title='Cash Accounts'
        />
    );
};

export default CashAccountsPage;
