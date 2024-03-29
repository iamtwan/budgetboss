'use client';

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
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <Button id='logout-btn' className='btn btn-sm p-2 fw-semibold ms-2' onClick={handleLogout}><i className='bi bi-box-arrow-right'></i></Button>
    );
};

export default Logout;
