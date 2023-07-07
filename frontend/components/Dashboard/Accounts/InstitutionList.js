'use client';

import React, { useState } from 'react';
import { updateItem, deleteItem } from '../../../services/apiService';
import Link from './Link/LinkTokenExchange';
import { useSWRConfig } from 'swr';
import { Button } from 'react-bootstrap';

const Institution = ({
    institution,
    handleAccountClick,
    formatCurrency,
    handleAccountTransactionsClick,
    showTransactions,
    type
}) => {
    const [token, setToken] = useState(null);

    const { mutate } = useSWRConfig();

    const getUpdateToken = async (id) => {
        try {
            const response = await updateItem(id);
            setToken(response.linkToken);
        } catch (error) {
            console.log(error);
        }
    }

    const removeLinkedItem = async (id) => {
        try {
            await deleteItem(id);
        } catch (error) {
            console.log(error);
        } finally {
            mutate('http://localhost:8080/api/items');
            mutate('http://localhost:8080/api/charts');
        }
    }

    const hasLinkedAccount = institution.accounts.some(account => account.key.match(/linked\d+$/));

    return (
        <ul className='list-group list-group-flush'>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <h5
                        className={`fw-bolder text-uppercase ${institution.status === 'BAD' ? 'institution-text-stale' : 'institution-text'}`}
                        style={hasLinkedAccount ? { cursor: 'pointer', fontStyle: institution.status === 'BAD' ? 'italic' : 'normal' } : {}}
                        onClick={hasLinkedAccount ? () => getUpdateToken(institution.id) : undefined}
                    >
                        {institution.name}
                    </h5>
                </div>
                <div>
                    {hasLinkedAccount && (
                        <>
                            <Button id='btn-delete' className='btn btn-danger btn-sm p-1 mb-2' onClick={() => removeLinkedItem(institution.linkedId)}><i className='bi bi-trash-fill'></i></Button>
                        </>
                    )}
                </div>
            </div>
            {token && <Link linkToken={token} itemId={institution.id} />}
            {institution.accounts.map((account) => (
                <li className='d-flex flex-column mb-2' key={account.key}>
                    <div
                        style={{ cursor: 'pointer' }}
                        className='d-shrink-1'
                        onClick={() => handleAccountClick(account)}
                    >
                        <div className='d-flex justify-content-between w-100'>
                            <p className='fw-bold m-0 p-0 account-text'>{account.name}</p>
                            <p
                                className={`m-0 p-0 ${account.balance < 0
                                    ? (type === 'credit' ? 'text-success' : 'text-danger')
                                    : (type === 'credit' ? 'text-danger' : 'text-success')
                                    } fw-bold`}
                            >
                                {account.balance < 0 ? '-' : ''}
                                {formatCurrency(Math.abs(account.balance))}
                            </p>
                        </div>
                    </div>
                    <div className='ms-3'>
                        {showTransactions && (
                            <a
                                className='transaction-text fw-bolder link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-25-hover m-0 p-0'
                                href='#'
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleAccountTransactionsClick(institution.id, account, account.accountType);
                                }}
                            >
                                Transactions
                            </a>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default Institution;
