import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api';

export const filterLinkedAccounts = (accounts, type) => accounts.map(({ accounts: instAccounts, ...institution }) => ({
    ...institution,
    accounts: instAccounts.filter(account => account.type === type),
}));

export const filterManualAccounts = (accounts, type) => accounts.map(({ manualAccounts: instAccounts, ...institution }) => ({
    ...institution,
    accounts: instAccounts.filter(account => account.type === type),
}));

export const fetchAccounts = async (
    setIsLoading,
    setLinkedCashAccounts,
    setLinkedCreditAccounts,
    setInvestmentAccounts,
    setLinkedInstitutions,
    setManualData,
    setError,
    manualData
) => {
    setIsLoading(true);
    try {
        const [linkedAccountResponse, manualAccountsResponse] = await Promise.all([
            axios.get(`${API_BASE_URL}/items`, { withCredentials: true }),
            axios.get(`${API_BASE_URL}/manual-institutions`, { withCredentials: true }),
        ]);

        const filteredLinkedAccounts = linkedAccountResponse.data;
        const filteredManualAccounts = manualAccountsResponse.data;

        setLinkedCashAccounts(filterLinkedAccounts(filteredLinkedAccounts, 'DEPOSITORY'));
        setLinkedCreditAccounts(filterLinkedAccounts(filteredLinkedAccounts, 'CREDIT'));
        setInvestmentAccounts(filterLinkedAccounts(filteredLinkedAccounts, 'INVESTMENT'));
        setLinkedInstitutions(filteredLinkedAccounts);
        setManualData({
            ...manualData,
            institutions: [...filteredManualAccounts],
            accounts: [...filteredManualAccounts],
            cash: filterManualAccounts(filteredManualAccounts, 'CASH'),
            credit: filterManualAccounts(filteredManualAccounts, 'CREDIT'),
            investment: filterManualAccounts(filteredManualAccounts, 'INVESTMENT'),
        });
    } catch (err) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
};

export const handleToggleAddAccountForm = (showModal, setShowModal) => {
    setShowModal(!showModal);
};

export const generateToken = async (setLinkToken) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tokens`, {
            withCredentials: true,
        });

        setLinkToken(response.data.linkToken);
    } catch (err) {
        console.log(err);
    }
};
