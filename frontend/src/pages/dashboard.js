import 'bootstrap/dist/css/bootstrap.css';
import withAuth from '../components/Authentication/ProtectedRoute';
import DashboardPage from '../components/Dashboard/DashboardPage';


const Dashboard = () => {
    return (
        <main className="vh-100">
            <h1 className="text-uppercase">Budget Boss</h1>
            <DashboardPage />
        </main>
    );
};


export default withAuth(Dashboard);
