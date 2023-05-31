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
    const onSuccess = React.useCallback(async (public_token, metadata) => {
        try {
            const response = await axios.post("http://localhost:8080/api/tokens", {
                publicToken: public_token,
                id: metadata.institution.institution_id,
                name: metadata.institution.name
            }, { withCredentials: true });
        } catch (err) {
            console.log(err);
        }
    });

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

const filterAccounts = (accounts, type) => accounts.map(({ accounts: instAccounts, ...institution }) => ({
    ...institution,
    accounts: instAccounts.filter(account => account.type === type),
}));

const DashboardPage = () => {
    const [linkToken, setLinkToken] = useState(null);
    const [depositories, setDepositories] = useState([]);
    const [creditAccounts, setCreditAccounts] = useState([]);
    const [investmentAccounts, setInvestmentAccounts] = useState([]);
    const [institutions, setInstitutions] = useState([]);
    const [showModal, setShowModal] = useState(false);


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
            setDepositories(filterAccounts(accountsResponse.data, "DEPOSITORY"));
            setCreditAccounts(filterAccounts(accountsResponse.data, "CREDIT"));
            setInvestmentAccounts(filterAccounts(accountsResponse.data, "INVESTMENT"));
            setInstitutions(accountsResponse.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        generateToken();
    }, []);

    const handleToggleAddAccountForm = () => {
        setShowModal(!showModal);
    };

    const handleAddAccountFormSubmit = (formData) => {
        // Handle form submission logic here
        console.log(formData);
        // Close the form modal
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
                            <CashAccountsPage depositories={depositories} />
                            <CreditAccountsPage creditAccounts={creditAccounts} />
                            <InvestmentAccountsPage investmentAccounts={investmentAccounts} />
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
                institutions={institutions}
            />
        </div>
    );
};


export default withAuth(DashboardPage);
