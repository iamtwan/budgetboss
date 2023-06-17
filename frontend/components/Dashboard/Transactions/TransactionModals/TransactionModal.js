import React from 'react';
import TransactionForm from '../TransactionForm/TransactionForm';

const TransactionModal = ({ show, account, onClose, onSubmit, transaction }) => {
	const isEditing = Boolean(transaction);

	return (
		<TransactionForm
			show={show}
			account={account}
			onClose={onClose}
			onSubmit={onSubmit}
			transaction={transaction}
			isEditing={isEditing}
		/>
	);
};

export default TransactionModal;
