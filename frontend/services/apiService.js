const API_BASE_URL = 'http://localhost:8080/api';

// export const createSignUp = (formData) => {
//     return axios.post(`${API_BASE_URL}/users/register`, formData, { withCredentials: true });
// }

// export const fetchUserLogin = (formData) => {
//     return axios.post(`${API_BASE_URL}/users/login`, formData, { withCredentials: true });
// }

// export const userLogout = () => {
//     return axios.post(`${API_BASE_URL}/users/logout`, {}, { withCredentials: true });
// }

// export const fetchUser = () => {
//     return axios.get(`${API_BASE_URL}/users`, { withCredentials: true });
// }

// export const fetchLinkedAccounts = () => {
//     return axios.get(`${API_BASE_URL}/items`, { withCredentials: true });
// }

// export const fetchManualAccounts = () => {
//     return axios.get(`${API_BASE_URL}/manual-institutions`, { withCredentials: true });
// }

// export const createLinkToken = (tokenData) => {
//     return axios.post(`${API_BASE_URL}/tokens/exchange`, tokenData, { withCredentials: true });
// }

// export const fetchLinkToken = () => {
//     return axios.post(`${API_BASE_URL}/tokens`, {}, { withCredentials: true });
// }

// export const updateItem = (id) => {
//     return axios.post(`${API_BASE_URL}/tokens/${id}`, {}, { withCredentials: true });
// }

// export const fetchLinkedTransactions = (accountId) => {
//     return axios.get(`${API_BASE_URL}/transactions/${accountId}`, { withCredentials: true });
// }

// export const fetchManualTransactions = (accountId) => {
//     return axios.get(`${API_BASE_URL}/manual-transactions/${accountId}`, { withCredentials: true });
// }

// export const createManualAccount = (formData) => {
//     return axios.post(`${API_BASE_URL}/manual-accounts`, formData, { withCredentials: true })
// }

// export const deleteManualAccount = (accountId) => {
//     return axios.delete(`${API_BASE_URL}/manual-accounts/${accountId}`, { withCredentials: true });
// }

// export const updateManualAccount = (accountId, formData) => {
//     return axios.put(`${API_BASE_URL}/manual-accounts/${accountId}`, formData, { withCredentials: true });
// }

// export const createManualTransaction = (accountId, formData) => {
//     return axios.post(`${API_BASE_URL}/manual-transactions/${accountId}`, formData, { withCredentials: true });
// }

// export const deleteManualTransaction = (transactionId) => {
//     return axios.delete(`${API_BASE_URL}/manual-transactions/${transactionId}`, { withCredentials: true });
// }

// export const updateManualTransaction = (transactionId, formData) => {
//     return axios.put(`${API_BASE_URL}/manual-transactions/${transactionId}`, formData, { withCredentials: true });
// }

// export const fetchBarChart = () => {
//     return axios.get(`${API_BASE_URL}/charts`, { withCredentials: true });
// }

// export const fetchPieChart = (month) => {
//     return axios.get(`${API_BASE_URL}/charts/${month}`, { withCredentials: true });
// }

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

export const fetchLinkedAccounts = () => {
    return fetch(`${API_BASE_URL}/items`, { credentials: 'include' });
}

export const fetchManualAccounts = () => {
    return fetch(`${API_BASE_URL}/manual-institutions`, { credentials: 'include' });
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

export const fetchLinkToken = () => {
    return fetch(`${API_BASE_URL}/tokens`, {
        method: 'POST',
        credentials: 'include'
    });
}

export const updateItem = (id) => {
    return fetch(`${API_BASE_URL}/tokens/${id}`, {
        method: 'POST',
        credentials: 'include'
    });
}

export const fetchLinkedTransactions = (accountId) => {
    return fetch(`${API_BASE_URL}/transactions/${accountId}`, { credentials: 'include' });
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
    })
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
    return fetch(`${API_BASE_URL}/charts`, { credentials: 'include' });
}

export const fetchPieChart = (month) => {
    return fetch(`${API_BASE_URL}/charts/${month}`, { credentials: 'include' });
}
