import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import withAuth from '../Authentication/ProtectedRoute';
import InvestmentAccountsPage from './Accounts/InvestmentAccountsPage';
import CashAccountsPage from './Accounts/CashAccountsPage';
import CreditAccountsPage from './Accounts/CreditAccountsPage';
import AddAccountForm from './Accounts/AccountForms/AddAccountForm';
import EditAccountModal from './Accounts/AccountForms/EditAccountForm';
import { LinkAccount } from './Accounts/LinkAccount';
import useAccounts from '../../hooks/useAccounts';

import { fetchAccounts, handleToggleAddAccountForm, generateToken } from '../../utils/accountUtils';

const DashboardPage = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    const {
        linkToken,
        isLoading,
        error,
        linkedCash,
        linkedCredit,
        linkedInvestment,
        linkedInstitutions,
        manualData,
        setIsLoading,
        setLinkedCashAccounts,
        setLinkedCreditAccounts,
        setInvestmentAccounts,
        setLinkedInstitutions,
        setManualData,
        setError,
    } = useAccounts();

    const [showModal, setShowModal] = useState(false);

    const handleOpenEditModal = (account) => {
        setSelectedAccount(account);
        setShowEditModal(true);
    };

    const handleAccountUpdate = (formData) => {
        setManualData((prevState) => {
            const updatedAccounts = prevState.accounts.map((account) =>
                account.id === formData.id ? formData : account
            );
            return {
                ...prevState,
                accounts: updatedAccounts,
            };
        });
    };


    const handleAccountDelete = (accountId) => {
        setManualData((prevState) => {
            const updatedAccounts = prevState.accounts.filter((account) => account.id !== accountId);
            return {
                ...prevState,
                accounts: updatedAccounts,
            };
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="d-flex justify-content-center h-100">
            <div className="container-lg border rounded m-2 pb-4">
                <div className="d-flex justify-content-evenly p-0 m-2 h-50">
                    <div className="container border m-2 d-flex flex-column">
                        <div className="d-inline-flex align-items-center">
                            <h3 className="me-2">Accounts</h3>
                            {linkToken && <LinkAccount
                                linkToken={linkToken}
                                generateToken={generateToken}
                                fetchAccounts={fetchAccounts}
                                setIsLoading={setIsLoading}
                                setLinkedCashAccounts={setLinkedCashAccounts}
                                setLinkedCreditAccounts={setLinkedCreditAccounts}
                                setInvestmentAccounts={setInvestmentAccounts}
                                setLinkedInstitutions={setLinkedInstitutions}
                                setManualData={setManualData}
                                setError={setError}
                                manualData={manualData}
                            />}
                            <button className="btn btn-primary btn-sm" onClick={() => handleToggleAddAccountForm(showModal, setShowModal)}>
                                Add Account
                            </button>
                        </div>
                        <div className="row h-100">
                            <CashAccountsPage
                                linkedCash={linkedCash}
                                manualData={manualData}
                                setManualData={setManualData}
                                onOpenEditModal={handleOpenEditModal}
                            />
                            <CreditAccountsPage
                                linkedCredit={linkedCredit}
                                manualData={manualData}
                                setManualData={setManualData}
                                onOpenEditModal={handleOpenEditModal}
                            />
                            <InvestmentAccountsPage
                                linkedInvestment={linkedInvestment}
                                manualData={manualData}
                                setManualData={setManualData}
                                onOpenEditModal={handleOpenEditModal}
                            />

                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-evenly p-0 m-2 h-50">
                    <div className="container border m-2">
                        <h3>Budget</h3>
                    </div>
                    <div className="container border m-2">
                        <h3>Goals</h3>
                    </div>
                </div>
            </div>
            <AddAccountForm
                show={showModal}
                onClose={() => handleToggleAddAccountForm(showModal, setShowModal)}
                linkedInstitutions={linkedInstitutions}
                manualInstitutions={manualData.institutions}
                onSubmitSuccess={() =>
                    fetchAccounts(
                        setIsLoading,
                        setLinkedCashAccounts,
                        setLinkedCreditAccounts,
                        setInvestmentAccounts,
                        setLinkedInstitutions,
                        setManualData,
                        setError,
                        manualData
                    )
                }
            />
            <EditAccountModal
                show={showEditModal}
                account={selectedAccount}
                onClose={() => setShowEditModal(false)}
                onAccountUpdate={handleAccountUpdate}
                onAccountDelete={handleAccountDelete}
                onSubmitSuccess={() =>
                    fetchAccounts(
                        setIsLoading,
                        setLinkedCashAccounts,
                        setLinkedCreditAccounts,
                        setInvestmentAccounts,
                        setLinkedInstitutions,
                        setManualData,
                        setError,
                        manualData
                    )
                }
            />
        </div>
    );
};

export default withAuth(DashboardPage);
