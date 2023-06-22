'use client';

import 'bootstrap/dist/css/bootstrap.css'; // development
// import 'bootstrap/dist/css/bootstrap.min.css'; // production
import withAuth from '../../components/Authentication/ProtectedRoute';
import DashboardPage from '../../components/Dashboard/DashboardPage';
// import { useState } from 'react';
import Logout from '../../components/Authentication/Logout';
// import LoginSignUpPage from '../../components/Authentication/LoginSignUpPage';
// import PlaidWebhooks from '../../hooks/plaidWebhooks';


const Dashboard = () => {
    // const [isLoggedIn, setIsLoggedIn] = useState(true);

    return (
        <main className="vh-100">
            <div className="d-flex justify-content-between align-items-center mx-4">
                <h1 className="text-uppercase">Budget Boss</h1>
                <div>
                    {/* {isLoggedIn && <Logout onLogout={() => setIsLoggedIn(false)} />} */}
                    <Logout />
                </div>
            </div>
            {/* <PlaidWebhooks /> */}
            {/* {isLoggedIn ? <Dashboard /> : <LoginSignUpPage />} */}
            <DashboardPage />
        </main>
    );
};


export default withAuth(Dashboard);
