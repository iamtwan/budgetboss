import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import withAuth from '../components/ProtectedRoute';
import CashAccount from '../components/CashAccount';

const Link = ({ linkToken }) => {
    const onSuccess = React.useCallback((public_token, metadata) => {
        axios.post("http://localhost:8080/api/tokens/exchange", {
            publicToken: public_token,
            id: metadata.institution.institution_id,
            name: metadata.institution.name
        }, { withCredentials: true });
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

const DashboardPage = () => {
    const [institutions, setInstitutions] = useState([]);
    const [linkToken, setLinkToken] = useState(null);

    const generateToken = async () => {
        try {
            const response = await axios.post("http://localhost:8080/api/tokens", {}, {
                withCredentials: true,
            });

            console.log(response);
            setLinkToken(response.data.linkToken);
        } catch (err) {
            console.log(err);
        }
    };



    useEffect(() => {
        generateToken();
    }, []);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/items", {withCredentials: true});
                console.log(response);
                setInstitutions(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchAccounts();
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
                                <div className="col border m-2">
                                    <h4 className="text-uppercase">Cash Accounts</h4>
                                    <ul className="list-group list-group-flush">
                                        {
                                            institutions.map((institution) => <CashAccount key={institution.id} institution={institution}/>)
                                        }
                                    </ul>
                                </div>
                                <div className="col border m-2">
                                    <h4 className="text-uppercase">Credit Accounts</h4>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <p className="fw-bolder mb-1">Institution (plaid item)</p>
                                            <div className="d-flex justify-content-between ms-3 mb-n1">
                                                <p className="fw-medium">(account type/name)</p>
                                                <p className="me-4">-</p>
                                                <p>(balance)</p>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <p className="fw-bolder mb-1">Institution (plaid item)</p>
                                            <div className="d-flex justify-content-between ms-3">
                                                <p className="fw-medium">(account type/name)</p>
                                                <p className="me-4">-</p>
                                                <p>(balance)</p>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <p className="fw-bolder mb-1">Institution (plaid item)</p>
                                            <div className="d-flex justify-content-between ms-3">
                                                <p className="fw-medium">(account type/name)</p>
                                                <p className="me-4">-</p>
                                                <p>(balance)</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col border m-2">
                                    <h4 className="text-uppercase">Investment Accounts</h4>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <p className="fw-bolder mb-1">Institution (plaid item)</p>
                                            <div className="d-flex justify-content-between ms-3 mb-n1">
                                                <p className="fw-medium">(investment type/name)</p>
                                                <p className="me-4">-</p>
                                                <p>(value)</p>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <p className="fw-bolder mb-1">Institution (plaid item)</p>
                                            <div className="d-flex justify-content-between ms-3">
                                                <p className="fw-medium">(investment type/name)</p>
                                                <p className="me-4">-</p>
                                                <p>(value)</p>
                                            </div>
                                        </li>
                                        <li className="list-group-item mb-n1">
                                            <p className="fw-bolder mb-1">Institution (plaid item)</p>
                                            <div className="d-flex justify-content-between ms-3">
                                                <p className="fw-medium">(investment type/name)</p>
                                                <p className="me-4">-</p>
                                                <p>(value)</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
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
    )
};


export default withAuth(DashboardPage);
