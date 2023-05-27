import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import withAuth from '../components/ProtectedRoute';
import InvestmentAccountsPage from '../components/InvestmentAccountsPage';
import CashAccountsPage from '../components/CashAccountsPage';
import CreditAccountsPage from '@/components/CreditAccountsPage';

const Link = ({ linkToken }) => {
    const onSuccess = React.useCallback(async (public_token, metadata) => {
        try {
            const response = await axios.post("http://localhost:8080/api/items/token", {
                publicToken: public_token,
                institutionId: metadata.institution.institution_id,
                institutionName: metadata.institution.name
            }, { withCredentials: true });
        } catch(err) {
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

    const generateToken = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/items/token", {
                withCredentials: true,
            });

            setLinkToken(response.data.linkToken);

            const accountsResponse = await axios.get("http://localhost:8080/api/items", {
                withCredentials: true,
            });

            console.log(accountsResponse);
            setDepositories(filterAccounts(accountsResponse.data, "DEPOSITORY"));
            setCreditAccounts(filterAccounts(accountsResponse.data, "CREDIT"));
            setInvestmentAccounts(filterAccounts(accountsResponse.data, "INVESTMENT"));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        generateToken();
    }, []);

    return (
        <main className="vh-100">
            <h1 className="text-uppercase">Budget Boss</h1>
            <div className="d-flex justify-content-center h-100">
                <div className="container-lg border rounded m-2 pb-4">
                    <div className="d-flex justify-content-evenly p-0 m-2 h-50">
                        <div className="container border m-2 d-flex flex-column">
                            <div className="d-inline-flex align-items-center">
                                <h3 className="me-2">Accounts</h3>
                                {linkToken && <Link linkToken={linkToken} />}
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
            </div>
        </main>
    );
};


export default withAuth(DashboardPage);
