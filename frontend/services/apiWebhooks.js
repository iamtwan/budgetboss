import { API_BASE_URL } from './apiConfig';


export const resetItem = async (itemId) => {
  try {
    await fetch(`${API_BASE_URL}/webhooks/item/${itemId}/reset`, {
      method: 'GET',
      credentials: 'include'
    });

  } catch (error) {
    throw error;
  }
};

export const fireEvent = async (itemId) => {
  try {
    await fetch(`${API_BASE_URL}/webhooks/item/${itemId}/fire`, {
      method: 'GET',
      credentials: 'include'
    });

  } catch (error) {
    throw error;
  }
};
