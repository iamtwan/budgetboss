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
        <div className='col m-2'>
            <h2 className='text-uppercase text-center text-nowrap fw-bold mt-2 fs-2'>{title}</h2>
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
                    type={type}
                />
            )}

        </div>
    );
};

export default AccountsList;
