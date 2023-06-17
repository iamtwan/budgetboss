'use client';

import { useState, useEffect } from 'react';
import { fetchAccounts, generateToken } from '../utils/accountUtils';

const useAccounts = () => {
    const [linkToken, setLinkToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [linkedCash, setLinkedCashAccounts] = useState([]);
    const [linkedCredit, setLinkedCreditAccounts] = useState([]);
    const [linkedInvestment, setInvestmentAccounts] = useState([]);
    const [linkedInstitutions, setLinkedInstitutions] = useState([]);
    const [manualData, setManualData] = useState({
        institutions: [],
        accounts: [],
        cash: [],
        credit: [],
        investment: [],
    });

    const mergeAccounts = (linkedAccounts, manualAccountsData) => {
        const mergedAccounts = {};

        linkedAccounts.forEach(institution => {
            const key = institution.name.toLowerCase();

            mergedAccounts[key] = mergedAccounts[key] || {
                name: institution.name,
                accounts: [],
                id: institution.id
            };

            institution.accounts.forEach(account => {
                mergedAccounts[key].accounts.push({
                    key: 'linked' + account.id,
                    id: account.id,
                    name: account.name,
                    balance: account.balances.current || account.balances.available,
                    type: account.type,
                    accountType: "linked",
                });
            });
        });

        manualAccountsData.forEach(institution => {
            const key = institution.name.toLowerCase();

            mergedAccounts[key] = mergedAccounts[key] || {
                name: institution.name,
                accounts: []
            };

            mergedAccounts[key].id = institution.name;

            institution.accounts.forEach(account => {
                mergedAccounts[key].accounts.push({
                    key: 'manual' + account.id,
                    id: account.id,
                    name: account.name,
                    balance: account.balance,
                    type: account.type,
                    accountType: "manual"
                });
            });
        });

        return Object.values(mergedAccounts);
    }

    useEffect(() => {
        generateToken(setLinkToken);
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
    }, []);

    return {
        linkToken,
        isLoading,
        error,
        linkedCash,
        linkedCredit,
        linkedInvestment,
        linkedInstitutions,
        manualData,
        setIsLoading,
        setLinkedCashAccounts,
        setLinkedCreditAccounts,
        setInvestmentAccounts,
        setLinkedInstitutions,
        setManualData,
        setError,
        mergeAccounts,
    };
};

export default useAccounts;
