import { Button } from 'react-bootstrap';
import { userLogout } from '../../services/apiService';
import { useRouter } from 'next/navigation';
import { useSWRConfig } from 'swr';

const Logout = () => {
    const router = useRouter();
    const { cache } = useSWRConfig();

    const clearCache = () => [...cache.keys()].forEach((key) => cache.delete(key));

    const handleLogout = async () => {
        try {
            await userLogout();
            router.push('/');
            clearCache();
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <Button className='btn btn-warning' onClick={handleLogout}>Logout</Button>
    );
};

export default Logout;
