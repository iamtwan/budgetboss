import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchUser } from '../../services/apiService';

const withAuth = (WrappedComponent) => {
    return () => {
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [isLoading, setIsLoading] = useState(true);
        const router = useRouter();

        useEffect(() => {
            const checkAuthentication = async () => {
                try {
                    await fetchUser();

                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Authentication error:', error);
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
            setTimeout(() => {
                router.push('/');
            }, 1000);

            return <p>Unauthorized. Please log in to access this page.</p>;
        }

        return <WrappedComponent />;
    };
};


export default withAuth;
