import { ProgressBar } from 'react-bootstrap';
import { Button, ButtonGroup } from 'react-bootstrap';

const GoalItem = ({ goal, onDelete, onEdit }) => {
    const { targetAmount, savedAmount, calculation } = goal;
    const remainingAmount = targetAmount - savedAmount;

    return (
        <div>
            <div className='d-inline-flex mb-2'>
                <h4 className='fw-bold'>{goal.name}</h4>
                <ButtonGroup size='sm' aria-label='Basic example' className='pb-2 ms-1'>
                    <Button variant='secondary' onClick={() => onEdit(goal)}>Edit</Button>
                    <Button variant='danger' onClick={() => onDelete(goal)}>X</Button>
                </ButtonGroup>
            </div>
            <ProgressBar style={{ height: '30px' }}>
                <ProgressBar striped variant="success" now={calculation.percent} key={1} label={`$${savedAmount}`} className='fw-bold' />
                <ProgressBar variant="warning" now={100 - calculation.percent} key={2} label={`$${remainingAmount} remaining in ${calculation.daysRemaining} Days`} className='fw-bold text-uppercase text-black' />
            </ProgressBar>
        </div >
    );
}

export default GoalItem;
