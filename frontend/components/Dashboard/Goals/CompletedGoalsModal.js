import { Modal, Table, ButtonGroup, Button } from 'react-bootstrap';

const CompletedGoals = ({ goals, show, onClose, onDelete, onEdit }) => {
    return (
        <Modal show={show} size='lg' onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Completed Goals</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table>
                    <thead>
                        <tr>
                            <th>Goal</th>
                            <th>Saved</th>
                            <th>Deadline Date</th>
                            <th>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {goals
                            .filter(goal => goal.status === 'COMPLETED')
                            .map((goal) =>
                                <tr key={goal.id}>
                                    <td>{goal.name}</td>
                                    <td>{goal.savedAmount}</td>
                                    <td>{goal.targetDate}</td>
                                    <td>
                                        <ButtonGroup size='sm' aria-label='Basic example' className='pb-2 ms-1'>
                                            <Button variant='secondary' onClick={() => onEdit(goal)}>Edit</Button>
                                            <Button variant='danger' onClick={() => onDelete(goal)}>X</Button>
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
