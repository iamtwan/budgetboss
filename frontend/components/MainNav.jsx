'use client';

import { usePathname } from 'next/navigation';
import Logout from './Authentication/Logout';
import { Bungee } from 'next/font/google';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AddAccountDropdown from './Dashboard/Accounts/AddAccountDropdown';

const bungee = Bungee({
    weight: ['400'],
    subsets: ['latin'],
    display: 'swap',
});

const MainNav = () => {
    const pathname = usePathname();

    return (
        <Navbar expand='lg' className='p-0 nav-height mb-2'>
            <Container className='navbar-container'>
                <Navbar.Brand className={bungee.className}>
                    <p className='m-0 fs-1 logo-spacing nav-text'>
                        <span className='nav-logo nav-b-text flip-horizontal'>B</span>
                        udget<span className='nav-logo nav-b-text'>B</span>oss
                    </p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
                    <Nav className='ms-auto align-items-center'>
                        {pathname === '/dashboard' && (
                            <>
                                <AddAccountDropdown />
                                <Logout />
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MainNav;
