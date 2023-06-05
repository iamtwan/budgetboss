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
    };
};

export default useAccounts;
