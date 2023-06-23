import { useRouter } from 'next/navigation';
import { useUser } from '../../services/apiService';
import { Spinner } from 'react-bootstrap';

const withAuth = (WrappedComponent) => {
    return () => {
        const router = useRouter();
        const { error, isLoading } = useUser();

        if (error) {
            setTimeout(() => {
                router.push('/');
            }, 1000);

            return <Spinner />;
        }

        if (isLoading) {
            return <div>Loading...</div>
        }

        return <WrappedComponent />;
    };
}

export default withAuth;
