import { Modal, Table, ButtonGroup, Button } from 'react-bootstrap';

const formatDate = (dateString) => {
    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, dateOptions);
}

const CompletedGoals = ({ goals, show, onClose, onDelete, onEdit }) => {
    return (
        <Modal centered show={show} size='xl' onHide={onClose}>
            <Modal.Header closeButton className='nav-text container-background'>
                <Modal.Title className='ms-2 text-uppercase fs-2 w-100 text-center fw-bold'>Completed Goals</Modal.Title>
            </Modal.Header>
            <Modal.Body className='container-background rounded'>
                <Table hover size='sm'>
                    <thead>
                        <tr className='d-flex-inline nav-text fs-4'>
                            <th className='text-uppercase fs-4 flex-grow-1 text-nowrap'>Goal</th>
                            <th className='text-center text-uppercase flex-grow-1 text-nowrap'>Amount Saved</th>
                            <th className='text-center text-uppercase text-nowrap'>Created Date</th>
                            <th className='text-center text-uppercase text-nowrap'>Completed Date</th>
                            <th className='text-center text-uppercase text-nowrap'>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {goals
                            .filter(goal => goal.status === 'COMPLETED')
                            .map((goal) =>
                                <tr key={goal.id} className='align-middle nav-text'>
                                    <td className='fw-semibold text-nowrap'>{goal.name}</td>
                                    <td className='text-center text-nowrap'>${Math.round(goal.savedAmount)}</td>
                                    <td className='text-center'>{formatDate(goal.createdAt)}</td>
                                    <td className='text-center'>{formatDate(goal.completedAt)}</td>
                                    <td className='text-center'>
                                        <ButtonGroup size='sm' aria-label='edit delete goal buttons' className='pb-2 me-1'>
                                            <Button id='btn-edit' className='p-1 m-0' variant='secondary' onClick={() => onEdit(goal)}><i className='bi bi-pencil-square'></i></Button>
                                            <Button id='btn-delete' className='p-1 m-0' variant='danger' onClick={() => onDelete(goal)}><i className='bi bi-trash-fill'></i></Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </Table>
            </Modal.Body>
        </Modal>
    );
}

export default CompletedGoals;
