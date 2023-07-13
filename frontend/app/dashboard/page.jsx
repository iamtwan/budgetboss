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
        <div className='container main-dashboard'>
            <div className='row justify-content-around container-row-top py-4 mb-3 container-background dash-container-rows'>
                <div className='col-12 col-md-6 col-lg-4 h-100'>
                    <h2 className='text-uppercase text-center text-nowrap fw-bold mt-2 fs-2 heading-text'><i className='bi bi-dash'></i>Cash<i className='bi bi-dash'></i></h2>
                    <div className='overflow-y-auto max-height-accounts'>
                        <CashAccountsSection
                            onOpenEditModal={handleOpenEditModal}
                        />
                    </div>
                </div>
                <div className='col-12 col-md-6 col-lg-4 h-100'>
                    <h2 className='text-uppercase text-center text-nowrap fw-bold mt-2 fs-2 heading-text'><i className='bi bi-dash'></i>Credit<i className='bi bi-dash'></i></h2>
                    <div className='overflow-y-auto max-height-accounts'>
                        <CreditAccountsSection
                            onOpenEditModal={handleOpenEditModal}
                        />
                    </div>
                </div>
                <div className='col-12 col-md-6 col-lg-4 h-100'>
                    <h2 className='text-uppercase text-center text-nowrap fw-bold mt-2 fs-2 heading-text'><i className='bi bi-dash'></i>Investment<i className='bi bi-dash'></i></h2>
                    <div className='overflow-y-auto max-height-accounts'>
                        <InvestmentAccountsSection
                            onOpenEditModal={handleOpenEditModal}
                        />
                    </div>
                </div>
            </div>
            <div className='row mt-3 justify-content-between dash-container-rows'>
                <div className='bottom-left-container col-sm-12 col-md-12 col-lg-6 col-xl-6 me-lg-2 mb-sm-2 mb-md-2 mb-lg-0 container container-background'>
                    <BudgetSection />
                </div>
                <div className='bottom-right-container col-sm-12 col-md-12 col-lg col-xl ms-lg-2 mt-sm-2 mt-md-2 mt-lg-0 container-background'>
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
