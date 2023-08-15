'use client'

import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';


const RedirectToDashboard = () => {
    const router = useRouter();

    return (
        <Button id='back-dash' className='btn-sm p-2 fw-semibold' onClick={() => router.push('/dashboard')}>Dashboard</Button>
    )
}

export default RedirectToDashboard;
