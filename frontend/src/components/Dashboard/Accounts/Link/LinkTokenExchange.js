import React, { useEffect } from "react";
import { usePlaidLink } from 'react-plaid-link';
import axios from "axios";

const Link = ({ linkToken, itemId, isOAuth }) => {
    const onSuccess = React.useCallback((public_token, metadata) => {
        if (!itemId) {
            axios.post("http://localhost:8080/api/tokens/exchange", {
                publicToken: public_token,
                id: metadata.institution.institution_id,
                name: metadata.institution.name
            }, { withCredentials: true });
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
