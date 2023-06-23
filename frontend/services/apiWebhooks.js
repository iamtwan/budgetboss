import axios from 'axios';

export const resetItem = async (itemId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/webhooks/item/${itemId}/reset`, { withCredentials: true });
        const data = response.json();

        return data;
    } catch (error) {
        console.error('Failed to reset item', error)
    }
};

export const fireEvent = async (itemId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/webhooks/item/${itemId}/fire`, { withCredentials: true });
        const data = response.json();

        return data;
    } catch (error) {
        console.error('Failed to fire webhook event', error);
        throw error;
    }
};
