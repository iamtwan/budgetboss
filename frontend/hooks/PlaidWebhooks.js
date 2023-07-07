'use client';

import React, { useEffect } from 'react';
import { useSWRConfig } from 'swr';

const PlaidWebhooks = () => {
    const { mutate } = useSWRConfig();

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8080/api/events', { withCredentials: true });

        eventSource.onopen = (e) => {
            console.log("Connected to server");
        };

        eventSource.onmessage = (e) => {
            const { type, message } = JSON.parse(e.data);
            switch (type) {
                case 'ERROR':
                    console.log("Error: ", message);
                    mutate('http://localhost:8080/api/items')
                    break;
                case 'USER_PERMISSIONS_REVOKED':
                    mutate('http://localhost:8080/api/items')
                    console.log("User permissions revoked");
                    break;
                case 'SYNC_UPDATES_AVAILABLE':
                    mutate('http://localhost:8080/api/charts');
                    console.log("Updates available");
                    break;
                default:
                    console.log('Unknown type: ', type);
            }
        };

        eventSource.onerror = (e) => {
            console.log("Error occurred when connecting to server", e);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return <></>;
};

export default PlaidWebhooks;
