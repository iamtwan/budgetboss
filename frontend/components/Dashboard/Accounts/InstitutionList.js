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
    showTransactions = true,
}) => {
    return (
        <div className='col me-2'>
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
}

export default InstitutionList;
