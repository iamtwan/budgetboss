'use client';

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css'; // development
// import 'bootstrap/dist/css/bootstrap.min.css'; // production
import 'bootstrap-icons/font/bootstrap-icons.css';
import withAuth from '../../components/Authentication/ProtectedRoute';

import InvestmentAccountsPage from '../../components/Dashboard/Accounts/AccountPages/InvestmentAccountsSection';
import CashAccountsPage from '../../components/Dashboard/Accounts/AccountPages/CashAccountsSection';
import CreditAccountsPage from '../../components/Dashboard/Accounts/AccountPages/CreditAccountsSection';
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
        <div className='container-lg h-100'>
            <div className='row container-shadow container-row-top p-2 mb-3'>
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
            <div className='row container-shadow container-row-bot p-2 mt-3'>
                <BudgetSection />
                <GoalsSection />
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
