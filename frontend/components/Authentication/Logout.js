import { Button } from 'react-bootstrap';
import { userLogout } from '../../services/apiService';
import { useRouter } from 'next/navigation';

const Logout = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await userLogout();

            router.push('/');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <Button className='btn btn-warning' onClick={handleLogout}>Logout</Button>
    );
};

export default Logout;
