import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import withAuth from '../Authentication/ProtectedRoute';
import InvestmentAccountsPage from '../Accounts/InvestmentAccountsPage';
import CashAccountsPage from '../Accounts/CashAccountsPage';
import CreditAccountsPage from '../Accounts/CreditAccountsPage';
import AddAccountForm from '../Accounts/AddAccountForm';
import { LinkAccount } from '../Accounts/LinkAccount';
import useAccounts from '../../hooks/useAccounts';

import { fetchAccounts, handleToggleAddAccountForm, generateToken } from '../../utils/accountUtils';

const DashboardPage = () => {
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
                            />
                            <CreditAccountsPage
                                linkedCredit={linkedCredit}
                                manualData={manualData}
                                setManualData={setManualData}
                            />
                            <InvestmentAccountsPage
                                linkedInvestment={linkedInvestment}
                                manualData={manualData}
                                setManualData={setManualData}
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
        </div>
    );
};

export default withAuth(DashboardPage);
