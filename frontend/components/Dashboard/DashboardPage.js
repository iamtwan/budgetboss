'use client';

import React, { useState } from 'react';
import InvestmentAccountsPage from './Accounts/AccountPages/InvestmentAccountsSection';
import CashAccountsPage from './Accounts/AccountPages/CashAccountsSection';
import CreditAccountsPage from './Accounts/AccountPages/CreditAccountsSection';
import BudgetPage from './Budget/BudgetSection';
import GoalsPage from './Goals/GoalsSection';
import AddAccountForm from './Accounts/AccountForms/AddAccountForm';
import EditAccountModal from './Accounts/AccountForms/EditAccountForm';
import { LinkAccount } from './Accounts/Link/LinkAccount';
import { Dropdown } from 'react-bootstrap';
import { fetchLinkToken } from '../../services/apiService';
import useSWR from 'swr';
import PlaidWebhooks from '../../hooks/PlaidWebhooks';

const DashboardPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [linkAccountOpen, setLinkAccountOpen] = useState(false);

    const { data, error, isLoading } = useSWR("http://localhost:8080/api/tokens", fetchLinkToken, {
        refreshInterval: 60 * 25 * 1000,
        revalidateOnFocus: false,
    });

    if (error) {
        console.log(error.info);
        return <div>Error occurred</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleOpenEditModal = (account) => {
        setSelectedAccount(account);
        setShowEditModal(true);
    }

    const handleToggleAddAccountForm = (showModal, setShowModal) => {
        setShowModal(!showModal);
    }

    return (
        <div className="d-flex justify-content-center h-100">
            <div className="container-lg border rounded m-2 pb-4">
                <div className="d-flex justify-content-evenly p-0 m-2 h-50">
                    <div className="container border m-2 d-flex flex-column">
                        <div className="d-inline-flex d-flex justify-content-center align-items-center pb-0">
                            <div className="mt-2">
                                <h3 className="me-2 text-uppercase fw-bold d-inline-flex">Accounts</h3>
                            </div>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic" className='btn-sm'>
                                    Add Account
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setLinkAccountOpen(true)}>Link Account</Dropdown.Item>
                                    {linkAccountOpen && <LinkAccount linkToken={data.linkToken} openImmediately />}
                                    <Dropdown.Item onClick={() => handleToggleAddAccountForm(showModal, setShowModal)}>Manual Account</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
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
                        <div className="h-100">
                            <GoalsPage />
                        </div>
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
            <PlaidWebhooks />
        </div>
    );
}

export default DashboardPage;
