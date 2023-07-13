'use client'

import { useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { exchangeLinkToken } from '../../../../services/apiService';
import { useSWRConfig } from 'swr';

export const LinkAccount = ({
    linkToken, openImmediately = false, onClose
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
            onClose();
        } catch (err) {
            console.log(err);
        }
    }

    const config = {
        token: linkToken,
        onSuccess,
    }

    const { open, ready } = usePlaidLink(config);

    useEffect(() => {
        if (openImmediately && ready) {
            open();
        }
    }, [open, ready, openImmediately]);

    return null;
}
