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
            <div className='d-flex justify-content-between'>
                <h4 className='fw-semibold fs-4 ms-1 account-text'>{goal.name}</h4>
                <ButtonGroup size='sm' aria-label='edit delete goal buttons' className='pb-2 me-1'>
                    <Button id='btn-edit' className='p-1 m-0' variant='secondary' onClick={() => onEdit(goal)}><i className='bi bi-pencil-square'></i></Button>
                    <Button id='btn-delete' className='p-1 m-0' variant='danger' onClick={() => onDelete(goal)}><i className='bi bi-trash-fill'></i></Button>
                </ButtonGroup>
            </div>
            <ProgressBar className='progressbar-main'>
                <ProgressBar
                    striped
                    now={calculation.percent}
                    key={1}
                    label={calculation.percent < 20 ? '' : `$${roundedSavedAmount}`}
                    className='custom-success fw-bold fs-6'
                />
                <ProgressBar
                    now={100 - calculation.percent}
                    key={2}
                    label={calculation.percent < 80 ? `$${roundedRemainingAmount}` : ''}
                    className='custom-warning fw-bold fs-6'
                />
            </ProgressBar>
            <div className='form-text text-start fst-italic mt-0 ms-1'>
                <p className='text-nowrap transaction-text fw-bold'>
                    Currently saved {calculation.percent}% {calculation.percent < 20 ? `($${roundedSavedAmount})` : ''} of the ${roundedTargetAmount} goal with {goal.calculation.daysRemaining} days remaining.
                </p>
            </div>
        </div >
    );
}

export default GoalItem;
