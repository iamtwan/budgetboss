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
        return <div>Loading...</div>;
    }

    const handleToggleAddAccountForm = (showModal, setShowModal) => {
        setShowModal(!showModal);
    }

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant='primary' id='dropdown-basic' className='btn btn-sm p-2 fw-semibold'>
                    Add Account
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setLinkAccountOpen(true)}>Link Account</Dropdown.Item>
                    {linkAccountOpen && <LinkAccount linkToken={data.linkToken} openImmediately />}
                    <Dropdown.Item onClick={() => handleToggleAddAccountForm(showModal, setShowModal)}>Manual Account</Dropdown.Item>
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
