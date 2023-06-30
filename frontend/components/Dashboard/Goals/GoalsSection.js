'use client';

import GoalItem from './GoalItem';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import AddGoalForm from './GoalForms/AddGoalForm';
import CompletedGoals from './CompletedGoalsModal';
import { useSWRConfig } from 'swr';

import { fetchGoals, deleteGoal, updateGoal, createGoal } from '../../../services/apiService';

const GoalsList = () => {
    const [showModal, setShowModal] = useState(false);
    const [showCompletedModal, setShowCompletedModal] = useState(false);
    const [editedGoal, setEditedGoal] = useState(null);

    const { data, error, isLoading } = fetchGoals();
    const { mutate } = useSWRConfig();

    if (error) {
        return <div>Failed to load chart data</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleEditGoal = (goal) => {
        setEditedGoal(goal);
        setShowModal(true);
        setShowCompletedModal(false);
    }

    const handleDeleteGoal = async (goal) => {
        try {
            await deleteGoal(goal.id);

            mutate('http://localhost:8080/api/goals');
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitGoalForm = async (formData) => {
        try {
            if (editedGoal) {
                await updateGoal(editedGoal.id, formData);
            } else {
                await createGoal(formData);
            }

            mutate('http://localhost:8080/api/goals');
        } catch (error) {
            console.log(error);
        } finally {
            setEditedGoal(null);
        }
    }

    const handleToggleAddGoalForm = () => {
        setShowModal(!showModal);
    }

    const handleToggleCompleted = () => {
        setShowCompletedModal(!showCompletedModal);
    }

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <div className=''>
                    <Button className="btn btn-primary btn-sm mb-2" onClick={handleToggleAddGoalForm}>
                        Add Goal
                    </Button>
                </div>
                <div className=''>
                    <Button className="btn btn-success btn-sm mb-2" onClick={handleToggleCompleted}>
                        Completed
                    </Button>
                </div>

            </div>
            {data
                .filter(goal => goal.status === 'ACTIVE')
                .map(goal =>
                    <div className='mb-2' key={goal.id}>
                        <GoalItem
                            goal={goal}
                            onEdit={handleEditGoal}
                            onDelete={handleDeleteGoal}
                        />
                    </div>
                )}
            <AddGoalForm
                goal={editedGoal}
                show={showModal}
                onClose={handleToggleAddGoalForm}
                onSubmit={handleSubmitGoalForm}
            />
            <CompletedGoals
                goals={data}
                show={showCompletedModal}
                onClose={() => setShowCompletedModal(false)}
                onEdit={handleEditGoal}
                onDelete={handleDeleteGoal}
            />
        </div>
    );
}

export default GoalsList;
