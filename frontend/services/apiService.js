import useSWR from 'swr';

const API_BASE_URL = 'http://localhost:8080/api';

const fetcher = (url) => fetch(url, { credentials: 'include' }).then((response) => response.json());

export const createSignUp = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}

export const fetchUserLogin = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return await response.json();
}

export const userLogout = async () => {
    const response = await fetch(`${API_BASE_URL}/users/logout`, {
        method: 'POST',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response;
}

export const exchangeLinkToken = async (tokenData) => {
    const response = await fetch(`${API_BASE_URL}/tokens/exchange`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tokenData)
    });

    return response;
}

export const fetchLinkToken = async url => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'include'
    });

    return await response.json();
}

export const updateItem = async (id) => {
    const response = await fetch(`${API_BASE_URL}/tokens/${id}`, {
        method: 'POST',
        credentials: 'include'
    });

    return await response.json();
}

export const createManualAccount = async (formData) => {
    const response = await fetch(`${API_BASE_URL}/manual-accounts`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    return await response.json();
}

export const deleteManualAccount = async (accountId) => {
    const response = await fetch(`${API_BASE_URL}/manual-accounts/${accountId}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response;
}

export const updateManualAccount = async (accountId, formData) => {
    const response = await fetch(`${API_BASE_URL}/manual-accounts/${accountId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    return await response.json();
}

export const createManualTransaction = async (accountId, formData) => {
    const response = await fetch(`${API_BASE_URL}/manual-transactions/${accountId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    return await response.json();
}

export const deleteManualTransaction = async (transactionId) => {
    const response = await fetch(`${API_BASE_URL}/manual-transactions/${transactionId}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    return response;
}

export const updateManualTransaction = async (transactionId, formData) => {
    const response = await fetch(`${API_BASE_URL}/manual-transactions/${transactionId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    return await response.json();
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

export const useUser = () => {
    const { error, isLoading } = useSWR(`${API_BASE_URL}/users`, fetcher);

    return {
        error,
        isLoading,
    };
}
