import React, { useState } from 'react';
import InstitutionList from '../InstitutionList';
import { mergeAccounts } from '../../../../utils/accountUtils';
import { useManualData, useLinkedData } from '../../../../services/apiService';
import { filterManualAccounts, filterLinkedAccounts } from '../../../../utils/helpers';

const CreditAccountsSection = ({ onOpenEditModal }) => {
    const [selectedAccount, setSelectedAccount] = useState(null);

    const { data: manualData, error: manualError, isLoading: manualLoading } = useManualData();
    const { data: linkedData, error: linkedError, isLoading: linkedLoading } = useLinkedData();

    if (manualError || linkedError) {
        return <div>Error</div>
    }

    if (manualLoading || linkedLoading) {
        return <div>Loading...</div>
    }

    const manualCredit = filterManualAccounts(manualData, "CREDIT");
    const linkedCredit = filterLinkedAccounts(linkedData, "CREDIT");
    const institutions = mergeAccounts(linkedCredit, manualCredit);

    const handleAccountTransactionsClick = async (institutionId, account, type) => {
        try {
            setSelectedAccount({ institutionId, ...account, type });
        } catch (err) {
            console.log(err);
        }
    }

    const handleAccountClick = (account) => {
        if (account.accountType === "linked") return;

        onOpenEditModal(account);
    }

    const handleCloseModal = () => {
        setSelectedAccount(null);
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }

    return (
        <InstitutionList
            institutions={institutions}
            selectedAccount={selectedAccount}
            handleAccountClick={handleAccountClick}
            handleAccountTransactionsClick={handleAccountTransactionsClick}
            formatCurrency={formatCurrency}
            manualData={manualData}
            handleCloseModal={handleCloseModal}
            type='credit'
            title='Credit'
        />
    );
}

export default CreditAccountsSection;
