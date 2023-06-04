import React from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { createLinkToken } from '../../utils/apiService';
import { fetchAccounts } from '../../utils/accountUtils';

export const LinkAccount = ({
    linkToken,
    setIsLoading,
    setLinkedCashAccounts,
    setLinkedCreditAccounts,
    setInvestmentAccounts,
    setLinkedInstitutions,
    setManualData,
    setError,
    manualData
}) => {
    const onSuccess = async (public_token, metadata) => {
        try {
            const tokenData = {
                publicToken: public_token,
                id: metadata.institution.institution_id,
                name: metadata.institution.name
            };

            await createLinkToken(tokenData);

            fetchAccounts(
                setIsLoading,
                setLinkedCashAccounts,
                setLinkedCreditAccounts,
                setInvestmentAccounts,
                setLinkedInstitutions,
                setManualData,
                setError,
                manualData
            );
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
