import 'bootstrap/dist/css/bootstrap.css';
import withAuth from '../components/Authentication/ProtectedRoute';
import DashboardPage from '../components/Dashboard/DashboardPage';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Dashboard = () => {
    const [institutionsData, setInstitutionsData] = useState([]);

    useEffect(() => {
        const fetchInstitutionsData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/items", {
                    withCredentials: true,
                });
                setInstitutionsData(response.data.map(account => account.id));
            } catch (err) {
                console.log(err);
            }
        };

        fetchInstitutionsData();
    }, []);

    return (
        <main className="vh-100">
            <h1 className="text-uppercase">Budget Boss</h1>
            <DashboardPage institutions={institutionsData} />
        </main>
    );
};


export default withAuth(Dashboard);
