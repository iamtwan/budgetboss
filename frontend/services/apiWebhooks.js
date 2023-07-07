export const resetItem = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/webhooks/item/${itemId}/reset`, {
        method: 'GET',
        credentials: 'include'
      });

      console.log(response);
    } catch (error) {
      console.error('Failed to reset item', error);
    }
  };

  export const fireEvent = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/webhooks/item/${itemId}/fire`, {
        method: 'GET',
        credentials: 'include'
      });

      console.log(response);
    } catch (error) {
      console.error('Failed to fire webhook event', error);
      throw error;
    }
  };
