import React, { useEffect, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const App = () => {
    const [linkToken, setLinkToken] = useState(null);

    const generateToken = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/items/token", {
                withCredentials: true,
            });

            setLinkToken(response.data.linkToken);

            const userResponse = await axios.get("http://localhost:8080/api/items", {
                withCredentials: true, 
            });
            console.log(userResponse);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        generateToken();
    }, []);

    return linkToken != null ? <Link linkToken={linkToken} /> : (<button type="button" onClick={generateToken}>Connect Acct</button>)
}

const Link = props => {
    const onSuccess = React.useCallback(async (public_token, metadata) => {
        const response = await axios.post("http://localhost:8080/api/items/token", {
            publicToken: public_token,
            institutionId: metadata.institution.institution_id,
            institutionName: metadata.institution.institution_name
        }, { withCredentials: true });

        console.log(response);
    });

    const config = {
        token: props.linkToken,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <button type="button" className="btn btn-primary" onClick={() => open()} disabled={!ready}>
            Link Account
        </button>
    );
}

const DashboardPage = () => {
    return (
        <main className="vh-100">
            <h1 className="text-uppercase">Budget Boss</h1>
            <div className="d-flex justify-content-center h-75">
                <div className="container-lg border rounded m-2 pb-4">
                    <div className="d-flex justify-content-evenly p-0 m-2 h-50">
                        <div className="container border m-2 d-flex flex-column">
                            <h3 className="d-inline-block">Accounts</h3>
                            <App />
                            <div className="row h-100">
                                <div className="col border m-2">
                                    <h4 className="text-uppercase">Cash Accounts</h4>
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
                                </div>
                                <div className="col border m-2">
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
    );
};


export default DashboardPage;
