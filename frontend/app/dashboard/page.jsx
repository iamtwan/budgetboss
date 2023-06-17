'use client';

import 'bootstrap/dist/css/bootstrap.css'; // development
// import 'bootstrap/dist/css/bootstrap.min.css'; // production
import withAuth from '../../components/Authentication/ProtectedRoute';
import DashboardPage from '../../components/Dashboard/DashboardPage';
import Logout from '../../components/Authentication/Logout';
import PlaidWebhooks from '../../hooks/plaidWebhooks';


const Dashboard = () => {
    return (
        <main className="vh-100">
            <div className="d-flex justify-content-between align-items-center mx-4">
                <h1 className="text-uppercase">Budget Boss</h1>
                <div>
                    <Logout />
                </div>
            </div>
            <PlaidWebhooks />
            <DashboardPage />
        </main>
    );
};


export default withAuth(Dashboard);
