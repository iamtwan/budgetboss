import React, { useState, useEffect } from "react";
import Link from '../components/Link';

const OAuth = () => {
    const [token, setToken] = useState("");
    const [itemId, setItemId] = useState(0);

    const oauthObject = localStorage.getItem('oauthConfig');

    useEffect(() => {
      if (oauthObject != null) {
        setItemId(JSON.parse(oauthObject).itemId);
        setToken(JSON.parse(oauthObject).token);
      }
    }, [oauthObject]);

    return (
    <>
        {
            token && <Link linkToken={token} itemId={itemId} isOAuth={true} />
        }
    </>
    );
}

export default OAuth;