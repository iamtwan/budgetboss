import React, { useState } from 'react';
import useAccounts from '../../../../hooks/useAccounts';
import AccountsList from '../AccountsList';
// import { resetItem, fireEvent } from '../../../../services/apiWebhooks';

const CashAccountsPage = ({ linkedCash, manualData, setManualData, onOpenEditModal }) => {
    const [selectedAccount, setSelectedAccount] = useState(null);
    const { mergeAccounts } = useAccounts();

    const institutions = mergeAccounts(linkedCash, manualData.cash);

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

    // const handleReset = async (id) => {
    //     try {
    //         await resetItem(id);
    //     } catch (err) {
    //         console.log(err)
    //     }
    // };

    // const handleFireEvent = async (id) => {
    //     try {
    //         await fireEvent(id);
    //     } catch (err) {
    //         console.log(err)
    //     }
    // };

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
            type='cash'
            title='Cash Accounts'
        />
    );
};

export default CashAccountsPage;
