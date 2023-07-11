import React from 'react';
import TransactionListModal from '../Transactions/TransactionModals/TransactionListModal';
import AccountList from './AccountList';

const InstitutionList = ({
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
            <h2 className='text-uppercase text-center text-nowrap fw-bold mt-2 fs-2 heading-text'><i class="bi bi-dash-lg"></i>{title}<i class="bi bi-dash-lg"></i></h2>
            {
                institutions.map(institution => {
                    return institution.accounts.length > 0 &&
                        <AccountList
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

export default InstitutionList;
