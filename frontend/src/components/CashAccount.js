import React, {useEffect, useState} from "react";
import axios from "axios";
import Link from "../components/Link";

const CashAccount = ({institution}) => {
    const [token, setToken] = useState(null);

    const updateMode = async id => {
        try {
            const response = await axios.post(`http://localhost:8080/api/tokens/${id}`, {}, {
                withCredentials: true,
            });
            console.log(response);
            setToken(response.data.linkToken);

        } catch (error) {
            console.log(error);
        }
    }

    const fireMode = async id => {
        try {
            const response = await axios.get(`http://localhost:8080/api/webhooks/item/${id}/fire`, {
                withCredentials: true,
            });

            setToken(response.data.linkToken);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div onClick={() => fireMode(institution.id)}>{institution.name}</div>
            <button onClick={() => updateMode(institution.id)}>Update</button>
            {token && <Link linkToken={token} />}
            {
                institution.accounts.map(account => {
                  return <div key={account.id}>
                        <div>{account.name}</div>
                        <div>{account.type}</div>
                    </div>  
                })
            }
        </div>
    );
}

export default CashAccount;