import { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionView = ({ account }) => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            setIsLoading(true);
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));

                let url = "";
                const type = account.type
                if (type === "linked") {
                    url = `http://localhost:8080/api/transactions/${account.id}`;
                } else if (type === "manual") {
                    url = `http://localhost:8080/api/manual-transactions/${account.id}`;
                } else {
                    throw new Error("Unknown account type");
                }

                const response = await axios.get(url, {
                    withCredentials: true,
                });
                setTransactions(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchTransactions();
    }, [account]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <table className="table">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">Merchant</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.merchantName || transaction.name}</td>
                            <td>{transaction.date}</td>
                            <td>
                                {transaction.amount < 0 ? (
                                    <span>
                                        -${Math.abs(transaction.amount).toFixed(2)}
                                    </span>
                                ) : (
                                    <span>
                                        ${transaction.amount.toFixed(2)}
                                    </span>
                                )}
                            </td>
                            <td>{transaction.category.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionView;
