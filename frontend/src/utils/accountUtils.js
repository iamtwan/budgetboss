import { filterLinkedAccounts, filterManualAccounts } from "./helpers"
import { fetchLinkedAccounts, fetchManualAccounts, fetchLinkToken } from "../services/apiService";

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
            fetchLinkedAccounts(),
            fetchManualAccounts(),
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
        const response = await fetchLinkToken();

        setLinkToken(response.data.linkToken);
    } catch (err) {
        console.log(err);
    }
};
