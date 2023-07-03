import { Modal, Table, ButtonGroup, Button } from 'react-bootstrap';

const formatDate = (dateString) => {
    const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, dateOptions);
}

const CompletedGoals = ({ goals, show, onClose, onDelete, onEdit }) => {
    return (
        <Modal show={show} size='xl' onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className='text-uppercase fs-3 fw-bold'>Completed Goals</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <thead>
                        <tr className='d-flex-inline'>
                            <th className='text-uppercase fs-5 flex-grow-1 text-nowrap'>Goal</th>
                            <th className='text-center text-uppercase fs-5 flex-grow-2 text-nowrap'>Amount Saved</th>
                            <th className='text-center text-uppercase fs-5 text-nowrap'>Created Date</th>
                            <th className='text-center text-uppercase fs-5 text-nowrap'>Completed Date</th>
                            <th className='text-center text-uppercase fs-5 text-nowrap'>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {goals
                            .filter(goal => goal.status === 'COMPLETED')
                            .map((goal) =>
                                <tr key={goal.id} className='align-middle'>
                                    <td className='fw-medium text-nowrap'>{goal.name}</td>
                                    <td className='text-center text-nowrap'>${Math.round(goal.savedAmount)}</td>
                                    <td className='text-center'>{formatDate(goal.createdAt)}</td>
                                    <td className='text-center'>{formatDate(goal.completedAt)}</td>
                                    <td className='text-center'>
                                        <ButtonGroup size='sm' aria-label='edit delete goal buttons' className='pb-2 ms-1'>
                                            <Button className='p-1 m-0' variant='secondary' onClick={() => onEdit(goal)}>Edit</Button>
                                            <Button className='p-1 m-0' variant='danger' onClick={() => onDelete(goal)}>X</Button>
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
