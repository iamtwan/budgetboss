'use client';

import { useState } from 'react';
import InvestmentAccountsPage from './Accounts/AccountPages/InvestmentAccountsSection';
import CashAccountsPage from './Accounts/AccountPages/CashAccountsSection';
import CreditAccountsPage from './Accounts/AccountPages/CreditAccountsSection';
import BudgetSection from './Budget/BudgetSection';
import GoalsSection from './Goals/GoalsSection';
import EditAccountModal from './Accounts/AccountForms/EditAccountForm';
import PlaidWebhooks from '../../hooks/PlaidWebhooks';

const DashboardPage = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    const handleOpenEditModal = (account) => {
        setSelectedAccount(account);
        setShowEditModal(true);
    }

    return (
        <div className='d-flex justify-content-center h-100'>
            <div className='container-lg border rounded m-2 pb-4'>
                <div className='d-flex justify-content-evenly p-0 m-2 h-50'>
                    <div className='row h-100 w-100'>
                        <CashAccountsPage
                            onOpenEditModal={handleOpenEditModal}
                        />
                        <CreditAccountsPage
                            onOpenEditModal={handleOpenEditModal}
                        />
                        <InvestmentAccountsPage
                            onOpenEditModal={handleOpenEditModal}
                        />
                    </div>
                </div>
                <div className='d-flex justify-content-evenly p-0 m-2 h-50'>
                    <div className='container border m-2 h-100'>
                        <div className='h-100'>
                            <BudgetSection />
                        </div>
                    </div>
                    <div className='container border m-2'>
                        <div className='h-100'>
                            <GoalsSection />
                        </div>
                    </div>
                </div>
            </div>
            <EditAccountModal
                show={showEditModal}
                account={selectedAccount}
                onClose={() => setShowEditModal(false)}
            />
            <PlaidWebhooks />
        </div>
    );
}

export default DashboardPage;
