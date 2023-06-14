import React from 'react';

const MonthlyTransactionView = ({ monthData }) => {
    return (
        <div className="mx-3">
            {Object.keys(monthData.transactionsByAccount).map(account => {
                const transactions = monthData.transactionsByAccount[account];

                return (
                    <div key={account}>
                        <h3>{account}</h3>
                        <table className="table">
                            <thead>
                                <tr className="table-primary">
                                    <th scope="col">Name</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <tr key={index}>
                                        <td>{transaction.merchantName || transaction.name}</td>
                                        <td>{transaction.date}</td>
                                        <td>
                                            {transaction.amount < 0 ? (
                                                <span>
                                                    ${Math.abs(transaction.amount).toFixed(2)}
                                                </span>
                                            ) : (
                                                <span>
                                                    -${transaction.amount.toFixed(2)}
                                                </span>
                                            )}
                                        </td>
                                        <td>{transaction.category.join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            })}
        </div>
    );
};

export default MonthlyTransactionView;
