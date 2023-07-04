'use client';

import 'bootstrap/dist/css/bootstrap.css'; // development
import 'bootstrap-icons/font/bootstrap-icons.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; // production
import withAuth from '../../components/Authentication/ProtectedRoute';
import DashboardPage from '../../components/Dashboard/DashboardPage';

const Dashboard = () => {
    return (
        <main className='vh-100'>
            <DashboardPage />
        </main>

    );
}

export default withAuth(Dashboard);
