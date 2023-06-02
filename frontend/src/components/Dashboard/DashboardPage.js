import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import withAuth from '../Authentication/ProtectedRoute';
import InvestmentAccountsPage from '../Accounts/InvestmentAccountsPage';
import CashAccountsPage from '../Accounts/CashAccountsPage';
import CreditAccountsPage from '../Accounts/CreditAccountsPage';
import AddAccountForm from '../Accounts/AddAccountForm';



const Link = ({ linkToken }) => {
    const onSuccess = async (public_token, metadata) => {
        try {
            const response = await axios.post("http://localhost:8080/api/tokens", {
                publicToken: public_token,
                id: metadata.institution.institution_id,
                name: metadata.institution.name
            }, { withCredentials: true });
        } catch (err) {
            console.log(err);
        }
    };

    const config = {
        token: linkToken,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => open()}
            disabled={!ready}
        >
            Link Account
        </button>
    );
};

const filterLinkedAccounts = (accounts, type) => accounts.map(({ accounts: instAccounts, ...institution }) => ({
    ...institution,
    accounts: instAccounts.filter(account => account.type === type),
}));

const filterManualAccounts = (accounts, type) => accounts.map(({ manualAccounts: instAccounts, ...institution }) => ({
    ...institution,
    accounts: instAccounts.filter(account => account.type === type),
}));

const DashboardPage = () => {
    const [linkToken, setLinkToken] = useState(null);
    const [depositories, setDepositories] = useState([]);
    const [creditAccounts, setCreditAccounts] = useState([]);
    const [investmentAccounts, setInvestmentAccounts] = useState([]);
    const [linkedInstitutions, setLinkedInstitutions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [manualAccounts, setManualAccounts] = useState([]);
    const [manualInstitutions, setManualInstitutions] = useState([]);
    const [manualCash, setManualCash] = useState([]);
    const [manualCredit, setManualCredit] = useState([]);
    const [manualInvestment, setManualInvestment] = useState([]);


    const generateToken = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/tokens", {
                withCredentials: true,
            });

            // console.log(response)
            setLinkToken(response.data.linkToken);

            const accountsResponse = await axios.get("http://localhost:8080/api/items", {
                withCredentials: true,
            });

            // console.log(accountsResponse);
            // console.log(accountsResponse.data);
            setDepositories(filterLinkedAccounts(accountsResponse.data, "DEPOSITORY"));
            setCreditAccounts(filterLinkedAccounts(accountsResponse.data, "CREDIT"));
            setInvestmentAccounts(filterLinkedAccounts(accountsResponse.data, "INVESTMENT"));
            setLinkedInstitutions(accountsResponse.data);
        } catch (err) {
            console.log(err);
        }
    };

    const fetchManualAccounts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/manual-institutions", {
                withCredentials: true,
            });

            // refactor manualAccounts & manualInstitutions
            setManualAccounts(response.data);
            setManualInstitutions(response.data);
            setManualCash(filterManualAccounts(response.data, "CASH"));
            setManualCredit(filterManualAccounts(response.data, "CREDIT"))
            setManualInvestment(filterManualAccounts(response.data, "INVESTMENT"))
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        generateToken();
        fetchManualAccounts();
    }, []);

    const handleToggleAddAccountForm = () => {
        setShowModal(!showModal);
    };

    const handleAddAccountFormSubmit = async (formData) => {
        console.log(formData);
        try {
            const response = await axios.post("http://localhost:8080/api/manual-accounts", formData, {
                withCredentials: true,
            });
            console.log(response.data);
            generateToken();
            fetchManualAccounts();
        } catch (err) {
            console.log(err);
        }
        setShowModal(false);
    };

    return (
        <div className="d-flex justify-content-center h-100">
            <div className="container-lg border rounded m-2 pb-4">
                <div className="d-flex justify-content-evenly p-0 m-2 h-50">
                    <div className="container border m-2 d-flex flex-column">
                        <div className="d-inline-flex align-items-center">
                            <h3 className="me-2">Accounts</h3>
                            {linkToken && <Link linkToken={linkToken} />}
                            <button className="btn btn-primary btn-sm" onClick={() => handleToggleAddAccountForm()}>
                                Add Account
                            </button>
                        </div>
                        <div className="row h-100">
                            <CashAccountsPage depositories={depositories} manualCash={manualCash} />
                            <CreditAccountsPage creditAccounts={creditAccounts} manualCredit={manualCredit} />
                            <InvestmentAccountsPage investmentAccounts={investmentAccounts} manualInvestment={manualInvestment} />
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
                manualInstitutions={manualInstitutions}
            />
        </div>
    );
};


export default withAuth(DashboardPage);
