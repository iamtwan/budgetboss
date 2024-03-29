'use client';

import React, { useEffect } from "react";
import { usePlaidLink } from 'react-plaid-link';
import { API_BASE_URL } from 'services/apiConfig';


const Link = ({ linkToken, itemId, isOAuth }) => {
    const onSuccess = React.useCallback(async (public_token, metadata) => {
        if (!itemId) {
            await fetch(`${API_BASE_URL}/tokens/exchange`, {
                publicToken: public_token,
                id: metadata.institution.institution_id,
                name: metadata.institution.name,
                method: 'POST',
                credentials: 'include'
            });
        }
    });

    const config = {
        token: linkToken,
        onSuccess,
    };

    if (isOAuth) {
        config.receivedRedirectUri = window.location.href;
    }

    const { open, ready } = usePlaidLink(config);

    useEffect(() => {
        if (ready) {
            if (!isOAuth) {
                localStorage.setItem(
                    'oauthConfig',
                    JSON.stringify({
                        itemId,
                        token: linkToken,
                    })
                );
            }

            open();
        }
    }, [open, ready, linkToken, itemId, isOAuth]);

    return <></>;
};

export default Link;
