const TransactionView = ({ transactions, onTransactionClick, selectedTransactions, handleSelectTransaction }) => {
    return (
        <div>
            <table className="table">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">Delete</th>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Category</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedTransactions.includes(transaction.id)}
                                    onChange={() => handleSelectTransaction(transaction.id)}
                                />
                            </td>
                            <td
                                style={{ cursor: "pointer" }}
                                className="text-primary cursor-pointer"
                                onClick={() => onTransactionClick(transaction.id)}
                            >
                                {transaction.merchantName || transaction.name}
                            </td>
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
                            <td>{transaction.category}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionView;
