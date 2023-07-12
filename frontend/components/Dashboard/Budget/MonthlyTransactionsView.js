import { formatCategory } from 'utils/helpers';

const MonthlyTransactionView = ({ month }) => {
    return (
        <div className='mx-3'>
            {Object.keys(month.accounts).map(account => {
                const transactions = month.accounts[account];

                return (
                    <div key={account} className='container'>
                        <h3 className='heading-text'>{account}</h3>
                        <table className='table'>
                            <thead>
                                <tr className='table custom-warning'>
                                    <th scope='col' className='nameColumn'>Name</th>
                                    <th scope='col' className='dateColumn'>Date</th>
                                    <th scope='col' className='amountColumn'>Amount</th>
                                    <th scope='col' className='categoryColumn'>Category</th>
                                </tr>
                            </thead>
                            <tbody className='table-group-divider'>
                                {transactions.map((transaction, index) => (
                                    <tr key={index} className='nav-text'>
                                        <td className='nameColumn'>{transaction.merchantName || transaction.name}</td>
                                        <td className='dateColumn'>{transaction.date}</td>
                                        <td className='amountColumn'>
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
                                        <td className='categoryColumn'>{formatCategory(transaction.category)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            })}
        </div>
    );
}

export default MonthlyTransactionView;
