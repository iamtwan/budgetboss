'use client';

import { usePathname } from 'next/navigation';
import Logout from './Authentication/Logout';
import RedirectToDashboard from './Settings/RedirectToDashboard';
import RedirectToSettings from './Dashboard/RedirectToSettings';
import LoginNav from './Authentication/LoginNav';
import SignUpNav from './Authentication/SignUpNav';
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
        <Navbar expand='lg' className='mb-2'>
            <Container className='navbar-container'>
                <Navbar.Brand className={bungee.className}>
                    <p className='m-0 fs-1 logo-spacing nav-other-text'>
                        <span className='nav-logo heading-text flip-horizontal'>B</span>
                        udget<span className='nav-logo heading-text'>B</span>oss
                    </p>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav' className='justify-content-end'>
                    <Nav className='ms-auto align-items-center'>
                        {pathname === '/' && (
                            <>
                                <LoginNav />
                                <SignUpNav />
                            </>
                        )}
                        {pathname === '/dashboard' && (
                            <>
                                <AddAccountDropdown />
                                <Logout />
                                <RedirectToSettings />
                            </>
                        )}
                        {pathname === '/dashboard/settings' && (
                            <>
                                <RedirectToDashboard />
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
