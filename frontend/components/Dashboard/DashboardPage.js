'use client';

import React, { useState } from 'react';
import InvestmentAccountsPage from './Accounts/AccountPages/InvestmentAccountsPage';
import CashAccountsPage from './Accounts/AccountPages/CashAccountsPage';
import CreditAccountsPage from './Accounts/AccountPages/CreditAccountsPage';
import BudgetPage from './Budget/BudgetSection';
import AddAccountForm from './Accounts/AccountForms/AddAccountForm';
import EditAccountModal from './Accounts/AccountForms/EditAccountForm';
import { LinkAccount } from './Accounts/Link/LinkAccount';
import { Button } from 'react-bootstrap';
import { fetchLinkToken } from '../../services/apiService';
import useSWR from 'swr';

const DashboardPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    const { data, error, isLoading } = useSWR("http://localhost:8080/api/tokens", fetchLinkToken, {
        refreshInterval: 60 * 25 * 1000,
        revalidateOnFocus: false,
    });

    if (error) {
        return <div>Error occurred</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleOpenEditModal = (account) => {
        setSelectedAccount(account);
        setShowEditModal(true);
    };

    const handleToggleAddAccountForm = (showModal, setShowModal) => {
        setShowModal(!showModal);
    };

    return (
        <div className="d-flex justify-content-center h-100">
            <div className="container-lg border rounded m-2 pb-4">
                <div className="d-flex justify-content-evenly p-0 m-2 h-50">
                    <div className="container border m-2 d-flex flex-column">
                        <div className="d-inline-flex d-flex justify-content-center align-items-center pb-0">
                            <div className="mt-2">
                                <h3 className="me-2 text-uppercase fw-bold d-inline-flex">Accounts</h3>
                            </div>
                            <div>
                                {data.linkToken && <LinkAccount linkToken={data.linkToken} />}
                                <Button className="btn btn-primary btn-sm" onClick={() => handleToggleAddAccountForm(showModal, setShowModal)}>
                                    Add Account
                                </Button>
                            </div>
                        </div>
                        <div className="row h-100">
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
                </div>
                <div className="d-flex justify-content-evenly p-0 m-2 h-50">
                    <div className="container border m-2 h-100">
                        <h3 className="text-center text-uppercase fw-bold">Budget</h3>
                        <div className="h-100">
                            <BudgetPage />
                        </div>
                    </div>
                    <div className="container border m-2">
                        <h3 className="text-center text-uppercase fw-bold">Goals</h3>
                    </div>
                </div>
            </div>
            <AddAccountForm
                show={showModal}
                onClose={() => handleToggleAddAccountForm(showModal, setShowModal)}
            />

            <EditAccountModal
                show={showEditModal}
                account={selectedAccount}
                onClose={() => setShowEditModal(false)}
            />
        </div>
    );
};

export default DashboardPage;
