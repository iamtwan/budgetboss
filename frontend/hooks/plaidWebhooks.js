'use client';

import React, { useEffect } from 'react';

const PlaidWebhooks = () => {
    useEffect(() => {
        console.log("loading");
        const eventSource = new EventSource('http://localhost:8080/api/events', { withCredentials: true });

        eventSource.onopen = (e) => {
            console.log("Connected to server");
        };

        eventSource.onmessage = (e) => {
            console.log(e);
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
