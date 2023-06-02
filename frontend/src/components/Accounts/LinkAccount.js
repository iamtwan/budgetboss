import React from 'react';
import { usePlaidLink } from 'react-plaid-link';
import axios from 'axios';

const LinkAccount = ({ linkToken, fetchItems }) => {
    const onSuccess = async (public_token, metadata) => {
        try {
            await axios.post("http://localhost:8080/api/tokens", {
                publicToken: public_token,
                id: metadata.institution.institution_id,
                name: metadata.institution.name
            }, { withCredentials: true });

            fetchItems();
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
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => open()}
            disabled={!ready}
        >
            Link Account
        </button>
    );
};

export default LinkAccount;
