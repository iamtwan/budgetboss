import { ProgressBar } from 'react-bootstrap';

const GoalItem = ({ goal }) => {
    const { targetAmount, savedAmount, timeLeft } = goal;
    // calculation from backend APIs when ready
    const progressPercentage = (savedAmount / targetAmount) * 100;
    const remainingAmount = targetAmount - savedAmount;

    return (
        <div>
            <h3>{goal.name}</h3>
            <ProgressBar>
                <ProgressBar striped variant="success" now={progressPercentage} key={1} label={`$${savedAmount}`} className='fw-bold' />
                <ProgressBar variant="warning" now={100 - progressPercentage} key={2} label={`Need $${remainingAmount} in ${timeLeft} Days`} className='fw-bold text-uppercase' />
            </ProgressBar>
        </div >
    );
}

export default GoalItem;
    