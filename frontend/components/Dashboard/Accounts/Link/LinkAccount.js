import React from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { exchangeLinkToken } from '../../../../services/apiService';
import { useSWRConfig } from 'swr';

export const LinkAccount = ({
    linkToken
}) => {
    const { mutate } = useSWRConfig();

    const onSuccess = async (public_token, metadata) => {
        try {
            const tokenData = {
                publicToken: public_token,
                id: metadata.institution.institution_id,
                name: metadata.institution.name
            };

            await exchangeLinkToken(tokenData);
            mutate('http://localhost:8080/api/items');
            mutate('http://localhost:8080/api/charts');
        } catch (err) {
            console.log(err);
        }
    };

    const config = {
        token: linkToken,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <button
            type='button'
            className='btn btn-secondary btn-sm'
            onClick={() => open()}
            disabled={!ready}
        >
            Link Account
        </button>
    );
};
