import { useState, useEffect } from 'react';
import { fetchLinkedTransactions, fetchManualTransactions } from '../services/apiService';

const useTransactions = (account) => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);

            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));

                let response = null;
                const accountType = account.type;

                if (accountType === "linked") {
                    response = await fetchLinkedTransactions(account.id);
                } else if (accountType === "manual") {
                    response = await fetchManualTransactions(account.id);
                } else {
                    throw new Error("Unknown account type");
                }

                setTransactions(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, [account]);

    return { transactions, isLoading, setTransactions };
};

export default useTransactions;
