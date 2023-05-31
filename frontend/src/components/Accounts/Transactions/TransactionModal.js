import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import TransactionView from './TransactionView';

const TransactionModal = ({ account, onClose }) => {
  const [showModal, setShowModal] = useState(true);

  const handleCloseModal = () => {
    setShowModal(false);
    onClose();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{account?.name} Transactions</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {account && <TransactionView account={account} />}
      </Modal.Body>
    </Modal>
  );
};

export default TransactionModal;
