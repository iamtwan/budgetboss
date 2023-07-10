import React from 'react';
import InstitutionList from '../InstitutionList';
import { mergeAccounts } from '../../../../utils/accountUtils';
import { useManualData, useLinkedData } from '../../../../services/apiService';
import { filterManualAccounts, filterLinkedAccounts } from '../../../../utils/helpers';

const InvestmentAccountsSection = ({ onOpenEditModal }) => {
    const { data: manualData, error: manualError, isLoading: manualLoading } = useManualData();
    const { data: linkedData, error: linkedError, isLoading: linkedLoading } = useLinkedData();

    if (manualError || linkedError) {
        return <div>Error</div>;
    }

    if (manualLoading || linkedLoading) {
        return <div>Loading...</div>;
    }

    const manualInvestment = filterManualAccounts(manualData, 'INVESTMENT');
    const linkedInvestment = filterLinkedAccounts(linkedData, 'INVESTMENT')
    const institutions = mergeAccounts(linkedInvestment, manualInvestment);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const handleAccountClick = (account) => {
        if (account.accountType === "linked") return;

        onOpenEditModal(account);
    };

    return (
        <InstitutionList
            institutions={institutions}
            handleAccountClick={handleAccountClick}
            formatCurrency={formatCurrency}
            manualData={manualData}
            type='investment'
            title='Investment'
            showTransactions={false}
        />
    );
};

export default InvestmentAccountsSection;
