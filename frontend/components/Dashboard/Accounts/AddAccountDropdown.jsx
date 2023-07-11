'use client';

import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { LinkAccount } from './Link/LinkAccount';
import { fetchLinkToken } from '../../../services/apiService';
import AddAccountForm from './AccountForms/AddAccountForm';
import useSWR from 'swr';


const AddAccountDropdown = () => {
    const [showModal, setShowModal] = useState(false);
    const [linkAccountOpen, setLinkAccountOpen] = useState(false);

    const { data, error, isLoading } = useSWR('http://localhost:8080/api/tokens', fetchLinkToken, {
        refreshInterval: 60 * 25 * 1000,
        revalidateOnFocus: false,
    });

    if (error) {
        console.log(error.info);
        return <div>Error occurred</div>;
    }

    if (isLoading) {
        return (
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        );
    }

    const handleToggleAddAccountForm = (showModal, setShowModal) => {
        setShowModal(!showModal);
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant='primary' id='dropdown-basic' className='btn-sm p-2 fw-semibold'>
                    Add Account
                </Dropdown.Toggle>
                <Dropdown.Menu className='nav-text' style={{ backgroundColor: '#EFF6E0' }}>
                    <Dropdown.Item className='dropdown-item-custom' onClick={() => setLinkAccountOpen(true)}>Linked Account</Dropdown.Item>
                    {linkAccountOpen && <LinkAccount linkToken={data.linkToken} openImmediately />}
                    <Dropdown.Item className='dropdown-item-custom' onClick={() => handleToggleAddAccountForm(showModal, setShowModal)}>Manual Account</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <AddAccountForm
                show={showModal}
                onClose={() => handleToggleAddAccountForm(showModal, setShowModal)}
            />
        </>
    );

}

export default AddAccountDropdown;
