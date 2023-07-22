const TransactionView = ({ transactions, onTransactionClick, selectedTransactions, handleSelectTransaction }) => {
    return (
        <div className='container'>
            <table className='table'>
                <thead>
                    <tr className='table custom-warning'>
                        <th scope='col'>Delete</th>
                        <th scope='col'>Name <span className='text-nowrap transaction-text fw-lighter fst-italic'>(click to edit)</span></th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Category</th>
                    </tr>
                </thead>
                <tbody className='nav-text'>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>
                                <input
                                    type='checkbox'
                                    checked={selectedTransactions.includes(transaction.id)}
                                    onChange={() => handleSelectTransaction(transaction.id)}
                                />
                            </td>
                            <td
                                style={{ cursor: 'pointer' }}
                                className='fw-bold'
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
