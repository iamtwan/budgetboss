import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api';

export const createSignUp = (formData) => {
    return axios.post(`${API_BASE_URL}/users/register`, formData, { withCredentials: true });
}

export const fetchUserLogin = (formData) => {
    return axios.post(`${API_BASE_URL}/users/login`, formData, { withCredentials: true });
}

export const userLogout = () => {
    return axios.post(`${API_BASE_URL}/users/logout`, {}, { withCredentials: true });
}

export const fetchUser = () => {
    return axios.get(`${API_BASE_URL}/users`, { withCredentials: true });
}

export const fetchLinkedAccounts = () => {
    return axios.get(`${API_BASE_URL}/items`, { withCredentials: true });
};

export const fetchManualAccounts = () => {
    return axios.get(`${API_BASE_URL}/manual-institutions`, { withCredentials: true });
};

export const createLinkToken = (tokenData) => {
    return axios.post(`${API_BASE_URL}/tokens`, tokenData, { withCredentials: true });
};

export const fetchLinkToken = () => {
    return axios.get(`${API_BASE_URL}/tokens`, { withCredentials: true });
}

export const fetchLinkedTransactions = (accountId) => {
    return axios.get(`${API_BASE_URL}/transactions/${accountId}`, { withCredentials: true });
};

export const fetchManualTransactions = (accountId) => {
    return axios.get(`${API_BASE_URL}/manual-transactions/${accountId}`, { withCredentials: true });
};

export const createManualAccount = (formData) => {
    return axios.post(`${API_BASE_URL}/manual-accounts`, formData, { withCredentials: true })
}

export const deleteManualAccount = (accountId) => {
    return axios.delete(`${API_BASE_URL}/manual-accounts/${accountId}`, { withCredentials: true });
}

export const updateManualAccount = (accountId, formData) => {
    return axios.put(`${API_BASE_URL}/manual-accounts/${accountId}`, formData, { withCredentials: true });
}

export const createManualTransaction = (accountId, formData) => {
    return axios.post(`${API_BASE_URL}/manual-transactions/${accountId}`, formData, { withCredentials: true });
}

export const deleteManualTransaction = (transactionId) => {
    return axios.delete(`${API_BASE_URL}/manual-transactions/${transactionId}`, { withCredentials: true });
}

export const updateManualTransaction = (transactionId, formData) => {
    return axios.put(`${API_BASE_URL}/manual-transactions/${transactionId}`, formData, { withCredentials: true });
}
