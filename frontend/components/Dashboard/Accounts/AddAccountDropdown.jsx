'use client';

import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { LinkAccount } from './Link/LinkAccount';
import { fetchLinkToken } from '../../../services/apiService';
import { API_BASE_URL } from 'services/apiConfig';
import AddAccountForm from './AccountForms/AddAccountForm';
import useSWR from 'swr';


const AddAccountDropdown = () => {
    const [showModal, setShowModal] = useState(false);
    const [linkAccountOpen, setLinkAccountOpen] = useState(false);

    const { data, error, isLoading } = useSWR(`${API_BASE_URL}/tokens`, fetchLinkToken, {
        refreshInterval: 60 * 25 * 1000,
        revalidateOnFocus: false,
    });

    if (error) {
        return <div><p>Error. Please try again or contact support.</p></div>;
    }

    if (isLoading) {
        return (
            <div className='spinner-border' role='status'>
                <span className='visually-hidden'>Loading...</span>
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
                    Add
                </Dropdown.Toggle>
                <Dropdown.Menu className='nav-text' style={{ backgroundColor: '#EFF6E0' }}>
                    <Dropdown.Item className='dropdown-item-custom' onClick={() => setLinkAccountOpen(true)}>Linked Account</Dropdown.Item>
                    {linkAccountOpen && <LinkAccount linkToken={data.linkToken} openImmediately onClose={() => setLinkAccountOpen(false)} />}
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
