'use client'

import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';


const RedirectToSettings = () => {
    const router = useRouter();

    return (
        <Button id='back-dash' className='btn-sm ms-2 p-2 fw-semibold' onClick={() => router.push('/dashboard/settings')}><i className='bi bi-gear'></i></Button>
    )
}

export default RedirectToSettings;
