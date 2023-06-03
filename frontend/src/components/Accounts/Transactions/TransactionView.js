import { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionView = ({ account, transactions, isLoading }) => {
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
