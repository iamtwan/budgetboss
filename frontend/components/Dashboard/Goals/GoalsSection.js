import GoalItem from './GoalItem';

const data = [{
    "id": 1,
    "name": "Buy New Car",
    "targetAmount": 10000,
    "savedAmount": 4000,
    "timeLeft": 115,
    "isActive": true
},
{
    "id": 2,
    "name": "Playstation 5",
    "targetAmount": 700,
    "savedAmount": 570,
    "timeLeft": 75,
    "isActive": true
}];

const GoalsList = () => {
    return (
        <div>
            {data.map(goal =>
                <GoalItem
                    key={goal.id}
                    goal={goal}
                />
            )}
        </div>
    );
};

export default GoalsList;
