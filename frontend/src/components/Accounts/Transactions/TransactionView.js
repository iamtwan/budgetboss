import { useState, useEffect } from 'react';

const TransactionView = ({ account }) => {
    const [transactions, setTransactions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            const fakeTransactions = generateFakeTransactions();
            setTransactions(fakeTransactions);
            setIsLoading(false);
        }, 1000);
    }, [account]);

    const generateFakeTransactions = () => {
        const fakeTransactions = [
            { id: 1, Merchant: 'Apple', Date: '05-09-23', Amount: 1843.09, Category: 'Other' },
            { id: 2, Merchant: 'Safeway', Date: '05-10-23', Amount: 82.45, Category: 'Grocery' },
            { id: 3, Merchant: 'Steam', Date: '05-12-23', Amount: 21.26, Category: 'Gaming' },
            { id: 4, Merchant: 'Chick-fil-A', Date: '05-15-23', Amount: 15.43, Category: 'Food' },
            { id: 5, Merchant: 'Subway', Date: '05-17-23', Amount: 12.82, Category: 'Food' },
            { id: 6, Merchant: 'PG&E', Date: '05-20-23', Amount: 97.98, Category: 'Services' },
            { id: 7, Merchant: 'Microsoft', Date: '05-21-23', Amount: 1843.09, Category: 'Other' },
            { id: 8, Merchant: 'Wholefoods', Date: '05-25-23', Amount: 1082.45, Category: 'Grocery' },
            { id: 9, Merchant: 'Steam', Date: '05-25-23', Amount: 21.26, Category: 'Gaming' },
            { id: 10, Merchant: 'Narumi Sushi', Date: '05-26-23', Amount: 35.43, Category: 'Resturant' },
            { id: 11, Merchant: 'Robertos', Date: '05-27-23', Amount: 18.82, Category: 'Food' },
            { id: 12, Merchant: 'Netflix', Date: '05-28-23', Amount: 97.98, Category: 'Services' },
        ];

        return fakeTransactions;
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
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
                        <td>{transaction.Merchant}</td>
                        <td>{transaction.Date}</td>
                        <td>{transaction.Amount}</td>
                        <td>{transaction.Category}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionView;
