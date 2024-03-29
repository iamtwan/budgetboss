import useSWR from 'swr';
import { API_BASE_URL } from './apiConfig';

const fetcher = async (url) => {
  const response = await fetch(url, { credentials: 'include' });

  if (!response.ok) {
    throw new Error('Error: ', await response.json());
  }

  return await response.json();
};

export const sendSignUpCode = async (email) => {
  const response = await fetch(`${API_BASE_URL}/users/register/send-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    console.log(await response.json());
    throw { response };
  }

  return response;
};

export const createSignUp = async (updatedFormData) => {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFormData),
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw { response, responseData };
  }

  return await responseData;
};

export const fetchUserLogin = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw {
      status: response.status,
    };
  }

  return await response.json();
};

export const userLogout = async () => {
  const response = await fetch(`${API_BASE_URL}/users/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};

export const exchangeLinkToken = async (tokenData) => {
  const response = await fetch(`${API_BASE_URL}/tokens/exchange`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tokenData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};

export const fetchLinkToken = async (url) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    const error = new Error();
    error.status = response.status;
    error.info = await response.json();
    throw error;
  }

  return await response.json();
};

export const updateItem = async (id) => {
  const response = await fetch(`${API_BASE_URL}/tokens/${id}`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};

export const createManualAccount = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/manual-accounts`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};

export const deleteManualAccount = async (accountId) => {
  const response = await fetch(`${API_BASE_URL}/manual-accounts/${accountId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};

export const updateManualAccount = async (accountId, formData) => {
  const response = await fetch(`${API_BASE_URL}/manual-accounts/${accountId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};

export const createManualTransaction = async (accountId, formData) => {
  const response = await fetch(`${API_BASE_URL}/manual-transactions/${accountId}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};

export const deleteManualTransaction = async (transactionId) => {
  const response = await fetch(`${API_BASE_URL}/manual-transactions/${transactionId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};

export const updateManualTransaction = async (transactionId, formData) => {
  const response = await fetch(`${API_BASE_URL}/manual-transactions/${transactionId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};

export const fetchBarChart = () => {
  const { data, error, isLoading } = useSWR(`${API_BASE_URL}/charts`, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export const fetchPieChart = (month) => {
  const { data, error, isLoading } = useSWR(`${API_BASE_URL}/charts/${month}`, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export const useManualData = () => {
  const { data, error, isLoading, mutate } = useSWR(`${API_BASE_URL}/manual-institutions`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export const useLinkedData = () => {
  const { data, error, isLoading, mutate } = useSWR(`${API_BASE_URL}/items`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

// remove linked plaid (institution) item
export const deleteItem = async (itemId) => {
  const response = await fetch(`${API_BASE_URL}/items/${itemId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};

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
    mutate,
  };
};

// for protected route use
export const useUser = () => {
  const { data, error, isLoading } = useSWR(`${API_BASE_URL}/users`, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export const fetchGoals = () => {
  const { data, error, isLoading } = useSWR(`${API_BASE_URL}/goals`, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

export const createGoal = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/goals`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};

export const deleteGoal = async (goalId) => {
  const response = await fetch(`${API_BASE_URL}/goals/${goalId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};

export const updateGoal = async (goalId, formData) => {
  const response = await fetch(`${API_BASE_URL}/goals/${goalId}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};

export const changePassword = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/users/change-password`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};

export const unlinkAllItems = async () => {
  const response = await fetch(`${API_BASE_URL}/items/unlink`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};

export const deleteUserAccount = async () => {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response;
};

export const sendResetLink = async (email) => {
  const response = await fetch(`${API_BASE_URL}/users/recover-password/send-link`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw { response };
  }

  return response;
};

export const resetUserPassword = async (password, token) => {
  const response = await fetch(`${API_BASE_URL}/users/recover-password`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: password,
      verificationToken: token,
    }),
  });

  if (!response.ok) {
    throw { response };
  }

  return response;
};
