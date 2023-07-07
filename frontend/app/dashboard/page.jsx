'use client';

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // development
// import 'bootstrap/dist/css/bootstrap.min.css'; // production
import 'bootstrap-icons/font/bootstrap-icons.css';
import withAuth from '../../components/Authentication/ProtectedRoute';

import InvestmentAccountsSection from '../../components/Dashboard/Accounts/AccountPages/InvestmentAccountsSection';
import CashAccountsSection from '../../components/Dashboard/Accounts/AccountPages/CashAccountsSection';
import CreditAccountsSection from '../../components/Dashboard/Accounts/AccountPages/CreditAccountsSection';
import BudgetSection from '../../components/Dashboard/Budget/BudgetSection';
import GoalsSection from '../../components/Dashboard/Goals/GoalsSection';
import EditAccountModal from '../../components/Dashboard/Accounts/AccountForms/EditAccountForm';
import PlaidWebhooks from '../../hooks/PlaidWebhooks';

const Dashboard = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    const handleOpenEditModal = (account) => {
        setSelectedAccount(account);
        setShowEditModal(true);
    }

    return (
        <div className='container h-100'>
            <div className='row container-shadow container-row-top py-4 mb-3 container-background'>
                <div className='col overflow-y-auto' style={{ maxHeight: '100%' }}>
                    <CashAccountsSection
                        onOpenEditModal={handleOpenEditModal}
                    />
                </div>
                <div className='col overflow-y-auto' style={{ maxHeight: '100%' }}>
                    <CreditAccountsSection
                        onOpenEditModal={handleOpenEditModal}
                    />
                </div>
                <div className='col overflow-y-auto' style={{ maxHeight: '100%' }}>
                    <InvestmentAccountsSection
                        onOpenEditModal={handleOpenEditModal}
                    />
                </div>
            </div>
            <div className='row container-row-bot mt-3 justify-content-between'>
                <div className='col-sm-12 col-md-12 col-lg-5 col-xl-6 me-lg-2 mb-sm-2 mb-md-2 mb-lg-0 container container-shadow container-background'>
                    <BudgetSection />
                </div>
                <div className='col-sm-12 col-md-12 col-lg col-xl ms-lg-2 mt-sm-2 mt-md-2 mt-lg-0 container container-shadow container-background'>
                    <GoalsSection />
                </div>
            </div>
            <EditAccountModal
                show={showEditModal}
                account={selectedAccount}
                onClose={() => setShowEditModal(false)}
            />
            <PlaidWebhooks />
        </div >
    );
}

export default withAuth(Dashboard);
