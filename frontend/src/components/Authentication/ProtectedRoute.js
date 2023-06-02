import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const withAuth = (WrappedComponent) => {
    return () => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [isLoading, setIsLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const checkAuthentication = async () => {
                try {
                    const response = await axios.get("http://localhost:8080/api/users", {
                        withCredentials: true
                    });
                    setIsAuthenticated(true);
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                }
            };

            checkAuthentication();
        }, []);

        if (isLoading) {
            return <div className="d-flex justify-content-center vh-100 align-items-center">
                <div>
                    <p>Loading...</p>
                </div>
            </div>;
        }

        if (!isAuthenticated) {
            router.push('/');
            return null;
        }

        return <WrappedComponent />;
    };
};


export default withAuth;
