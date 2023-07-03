import { Modal, Table, ButtonGroup, Button } from 'react-bootstrap';

const CompletedGoals = ({ goals, show, onClose, onDelete, onEdit }) => {
    return (
        <Modal show={show} size='lg' onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title className='text-uppercase fs-3 fw-bold'>Completed Goals</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <thead>
                        <tr>
                            <th className='text-uppercase fs-5'>Goal</th>
                            <th className='text-center text-uppercase fs-5'>Amount Saved</th>
                            <th className='text-center text-uppercase fs-5'>Deadline Date</th>
                            <th className='text-center text-uppercase fs-5'>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {goals
                            .filter(goal => goal.status === 'COMPLETED')
                            .map((goal) =>
                                <tr key={goal.id} className='align-middle'>
                                    <td className='fw-medium'>{goal.name}</td>
                                    <td className='text-center'>${Math.round(goal.savedAmount)}</td>
                                    <td className='text-center'>{goal.targetDate}</td>
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
