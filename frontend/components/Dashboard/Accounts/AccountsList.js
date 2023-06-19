import React from 'react';
import TransactionListModal from '../Transactions/TransactionModals/TransactionListModal';
import Institution from './InstitutionList';

const AccountsList = ({
    institutions,
    selectedAccount,
    handleAccountClick,
    handleAccountTransactionsClick,
    formatCurrency,
    handleCloseModal,
    type,
    title,
    showTransactions = true,
}) => {
    return (
        <div className="col border m-2">
            <h4 className="text-uppercase text-info">{title}</h4>
            {
                institutions.map(institution => {
                    return institution.accounts.length > 0 &&
                    <Institution
                        key={institution.id}
                        institution={institution}
                        handleAccountClick={handleAccountClick}
                        handleAccountTransactionsClick={handleAccountTransactionsClick}
                        formatCurrency={formatCurrency}
                        showTransactions={showTransactions}
                        type={type}
                    />
                })
            }
            {selectedAccount && (
                <TransactionListModal
                    account={selectedAccount}
                    onClose={handleCloseModal}
                    setManualData={setManualData}
                    type={type}
                />
            )}
        </div>
    );
};

export default AccountsList;
