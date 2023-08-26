'use client';

import React, { useEffect } from 'react';
import { useSWRConfig } from 'swr';
import { API_BASE_URL } from 'services/apiConfig';


const PlaidWebhooks = () => {
    const { mutate } = useSWRConfig();

    useEffect(() => {
        const eventSource = new EventSource(`${API_BASE_URL}/events`, { withCredentials: true });

        eventSource.onmessage = (e) => {
            const { type } = JSON.parse(e.data);
            switch (type) {
                case 'ERROR':
                    mutate(`${API_BASE_URL}/items`);
                    break;
                case 'USER_PERMISSIONS_REVOKED':
                    mutate(`${API_BASE_URL}/items`);
                    break;
                case 'SYNC_UPDATES_AVAILABLE':
                    mutate(`${API_BASE_URL}/charts`);
                    break;
                default:
            }
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return <></>;
};

export default PlaidWebhooks;
