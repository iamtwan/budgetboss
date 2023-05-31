// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';

// const AddAccountForm = ({ show, onClose, onSubmit }) => {
//     const [accountName, setAccountName] = useState('');
//     const [accountType, setAccountType] = useState('');

//     const handleAccountNameChange = (event) => {
//         setAccountName(event.target.value);
//     };

//     const handleAccountTypeChange = (event) => {
//         setAccountType(event.target.value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         onSubmit({ accountName, accountType });
//         setAccountName('');
//         setAccountType('');
//     };

//     return (
//         <Modal show={show} onHide={onClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Add Account</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group controlId="accountName">
//                         <Form.Label>Account Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             value={accountName}
//                             onChange={handleAccountNameChange}
//                         />
//                     </Form.Group>
//                     <Form.Group controlId="accountType">
//                         <Form.Label>Account Type</Form.Label>
//                         <Form.Control
//                             as="select"
//                             value={accountType}
//                             onChange={handleAccountTypeChange}
//                         >
//                             <option value="">Select Account Type</option>
//                             {/* Add options for different account types */}
//                         </Form.Control>
//                     </Form.Group>
//                     <Button variant="primary" type="submit">
//                         Add
//                     </Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default AddAccountForm;

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddAccountForm = ({ show, institutions, onClose, onSubmit }) => {
    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [newInstitution, setNewInstitution] = useState('');
    const [accountName, setAccountName] = useState('');
    const [balance, setBalance] = useState('');

    const handleInstitutionChange = (e) => {
        const value = e.target.value;
        setSelectedInstitution(value);
    };

    const handleAccountNameChange = (e) => {
        setAccountName(e.target.value);
    };

    const handleBalanceChange = (e) => {
        setBalance(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            institution: selectedInstitution === 'create' ? newInstitution : selectedInstitution,
            accountName,
            balance,
        };
        onSubmit(formData);
    };

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="institution">
                        <Form.Label>Institution</Form.Label>
                        <Form.Select value={selectedInstitution} onChange={handleInstitutionChange} required>
                            <option value="">Select an institution</option>
                            {institutions.map((institution) => (
                                <option key={institution.id} value={institution.name}>
                                    {institution.name}
                                </option>
                            ))}
                            <option value="create">Create new institution</option>
                        </Form.Select>
                        {selectedInstitution === 'create' && (
                            <Form.Control
                                type="text"
                                placeholder="Enter institution name"
                                value={newInstitution}
                                onChange={(e) => setNewInstitution(e.target.value)}
                                required
                            />
                        )}
                    </Form.Group>
                    <Form.Group controlId="accountName">
                        <Form.Label>Account</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter account name"
                            value={accountName}
                            onChange={handleAccountNameChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="balance">
                        <Form.Label>Balance</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter starting balance"
                            value={balance}
                            onChange={handleBalanceChange}
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button className="btn btn-primary btn-md mt-2" type="submit">
                            Add
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddAccountForm;
