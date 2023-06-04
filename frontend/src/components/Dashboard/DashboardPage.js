import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

import withAuth from '../Authentication/ProtectedRoute';
import InvestmentAccountsPage from '../Accounts/InvestmentAccountsPage';
import CashAccountsPage from '../Accounts/CashAccountsPage';
import CreditAccountsPage from '../Accounts/CreditAccountsPage';
import AddAccountForm from '../Accounts/AddAccountForm';
import LinkAccount from '../Accounts/LinkAccount';

import { filterLinkedAccounts, filterManualAccounts } from '../../utils/accountUtils';

const DashboardPage = () => {
    const [linkToken, setLinkToken] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [linkedCash, setLinkedCashAccounts] = useState([]);
    const [linkedCredit, setLinkedCreditAccounts] = useState([]);
    const [linkedInvestment, setInvestmentAccounts] = useState([]);
    const [linkedInstitutions, setLinkedInstitutions] = useState([]);
    const [manualData, setManualData] = useState({
        institutions: [],
        accounts: [],
        cash: [],
        credit: [],
        investment: [],
    });

    const API_BASE_URL = 'http://localhost:8080/api';

    const generateToken = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/tokens`, {
                withCredentials: true,
            });

            setLinkToken(response.data.linkToken);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchAccounts = async () => {
        setIsLoading(true);
        try {
            const [linkedAccountResponse, manualAccountsResponse] = await Promise.all([
                axios.get(`${API_BASE_URL}/items`, { withCredentials: true }),
                axios.get(`${API_BASE_URL}/manual-institutions`, { withCredentials: true }),
            ]);

            const filteredLinkedAccounts = linkedAccountResponse.data;
            const filteredManualAccounts = manualAccountsResponse.data;

            setLinkedCashAccounts(filterLinkedAccounts(filteredLinkedAccounts, 'DEPOSITORY'));
            setLinkedCreditAccounts(filterLinkedAccounts(filteredLinkedAccounts, 'CREDIT'));
            setInvestmentAccounts(filterLinkedAccounts(filteredLinkedAccounts, 'INVESTMENT'));
            setLinkedInstitutions(filteredLinkedAccounts);
            setManualData({
                ...manualData,
                institutions: [...filteredManualAccounts],
                accounts: [...filteredManualAccounts],
                cash: filterManualAccounts(filteredManualAccounts, 'CASH'),
                credit: filterManualAccounts(filteredManualAccounts, 'CREDIT'),
                investment: filterManualAccounts(filteredManualAccounts, 'INVESTMENT'),
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleAddAccountForm = () => {
        setShowModal(!showModal);
    };

    const handleAddAccountFormSubmit = async (formData) => {
        setIsLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/manual-accounts`, formData, {
                withCredentials: true,
            });
            fetchAccounts();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }

        setShowModal(false);
    };

    useEffect(() => {
        generateToken();
        fetchAccounts();
    }, []);

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
                            {linkToken && <LinkAccount linkToken={linkToken} generateToken={generateToken} fetchAccounts={fetchAccounts} />}
                            <button className="btn btn-primary btn-sm" onClick={() => handleToggleAddAccountForm()}>
                                Add Account
                            </button>
                        </div>
                        <div className="row h-100">
                            <CashAccountsPage
                                linkedCash={linkedCash}
                                manualCash={manualData.cash}
                                setManualCash={setManualData.cash}
                            />
                            <CreditAccountsPage
                                linkedCredit={linkedCredit}
                                manualCredit={manualData.credit}
                                setManualCredit={setManualData.credit}
                            />
                            <InvestmentAccountsPage
                                linkedInvestment={linkedInvestment}
                                manualInvestment={manualData.investment}
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
                onClose={handleToggleAddAccountForm}
                onSubmit={handleAddAccountFormSubmit}
                linkedInstitutions={linkedInstitutions}
                manualInstitutions={manualData.institutions}
            />
        </div>
    );
};

export default withAuth(DashboardPage);
