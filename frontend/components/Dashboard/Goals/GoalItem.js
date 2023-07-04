import { ProgressBar } from 'react-bootstrap';
import { Button, ButtonGroup } from 'react-bootstrap';


const GoalItem = ({ goal, onDelete, onEdit }) => {
    const { targetAmount, savedAmount, calculation } = goal;

    const remainingAmount = targetAmount - savedAmount;
    const roundedSavedAmount = Math.round(savedAmount);
    const roundedTargetAmount = Math.round(targetAmount);
    const roundedRemainingAmount = Math.round(remainingAmount);

    return (
        <div>
            <div className='d-flex justify-content-between mt-3'>
                <h4 className='fw-semibold fs-4 ms-1'>{goal.name}</h4>
                <ButtonGroup size='sm' aria-label='edit delete goal buttons' className='pb-2 me-1'>
                    <Button className='p-1 m-0' variant='secondary' onClick={() => onEdit(goal)}><i class="bi bi-pencil-square"></i></Button>
                    <Button className='p-1 m-0' variant='danger' onClick={() => onDelete(goal)}><i class="bi bi-trash-fill"></i></Button>
                </ButtonGroup>
            </div>
            <ProgressBar style={{ height: '30px' }}>
                <ProgressBar
                    striped variant="success"
                    now={calculation.percent}
                    key={1}
                    label={calculation.percent < 20 ? '' : `$${roundedSavedAmount}`}
                    className='fw-bold fs-6'
                />
                <ProgressBar
                    variant="warning"
                    now={100 - calculation.percent}
                    key={2}
                    label={calculation.percent < 80 ? `$${roundedRemainingAmount}` : ''}
                    className='fw-bold text-black fs-6'
                />
            </ProgressBar>
            <div className='form-text text-start fst-italic mt-0 ms-1'>
                <p className='text-nowrap'>
                    Currently saved {calculation.percent}% {calculation.percent < 20 ? `($${roundedSavedAmount})` : ''} of the ${roundedTargetAmount} goal with {goal.calculation.daysRemaining} days remaining.
                </p>
            </div>
        </div >
    );
}

export default GoalItem;
