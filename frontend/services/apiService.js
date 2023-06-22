import useSWR from 'swr';

const API_BASE_URL = 'http://localhost:8080/api';

const fetcher = (url) => fetch(url, { credentials: 'include' }).then((res) => res.json());

export const createSignUp = (formData) => {
    return fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
}

export const fetchUserLogin = (formData) => {
    return fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
}

export const userLogout = () => {
    return fetch(`${API_BASE_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include'
    });
}

export const fetchUser = () => {
    return fetch(`${API_BASE_URL}/users`, { credentials: 'include' });
}

export const createLinkToken = (tokenData) => {
    return fetch(`${API_BASE_URL}/tokens/exchange`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tokenData)
    });
}

export const fetchLinkToken = async url => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include'
    });

    return await response.json();
}

export const updateItem = (id) => {
    return fetch(`${API_BASE_URL}/tokens/${id}`, {
        method: 'POST',
        credentials: 'include'
    });
}

export const fetchManualTransactions = (accountId) => {
    return fetch(`${API_BASE_URL}/manual-transactions/${accountId}`, { credentials: 'include' });
}

export const createManualAccount = (formData) => {
    return fetch(`${API_BASE_URL}/manual-accounts`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
}

export const deleteManualAccount = (accountId) => {
    return fetch(`${API_BASE_URL}/manual-accounts/${accountId}`, {
        method: 'DELETE',
        credentials: 'include'
    });
}

export const updateManualAccount = (accountId, formData) => {
    return fetch(`${API_BASE_URL}/manual-accounts/${accountId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
}

export const createManualTransaction = (accountId, formData) => {
    return fetch(`${API_BASE_URL}/manual-transactions/${accountId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
}

export const deleteManualTransaction = (transactionId) => {
    return fetch(`${API_BASE_URL}/manual-transactions/${transactionId}`, {
        method: 'DELETE',
        credentials: 'include'
    });
}

export const updateManualTransaction = (transactionId, formData) => {
    return fetch(`${API_BASE_URL}/manual-transactions/${transactionId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
}

export const fetchBarChart = () => {
    const { data, error, isLoading } = useSWR(`${API_BASE_URL}/charts`, fetcher);

    return {
        data,
        error,
        isLoading
    };
}

export const fetchPieChart = (month) => {
    return fetch(`${API_BASE_URL}/charts/${month}`, { credentials: 'include' });
}

export const useManualData = () => {
    const { data, error, isLoading, mutate } = useSWR(`${API_BASE_URL}/manual-institutions`, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    };
}

export const useLinkedData = () => {
    const { data, error, isLoading, mutate } = useSWR(`${API_BASE_URL}/items`, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    };
}

export const useTransactions = (accountType, id) => {
    let url;

    if (accountType === 'manual') {
        url = `${API_BASE_URL}/manual-transactions/${id}`;
    } else {
        url = `${API_BASE_URL}/transactions/${id}`;
    }

    const { data, error, isLoading, mutate } = useSWR(url, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    };
}
