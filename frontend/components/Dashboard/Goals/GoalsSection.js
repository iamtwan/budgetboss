'use client';

import GoalItem from './GoalItem';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import AddGoalForm from './GoalForms/AddGoalForm';
import { useSWRConfig } from 'swr';

import { fetchGoals, deleteGoal, updateGoal, createGoal } from '../../../services/apiService';

const GoalsList = () => {
    const [showModal, setShowModal] = useState(false);
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

    return (
        <div>
            <div className='text-center'>
                <Button className="btn btn-primary btn-sm mb-2" onClick={handleToggleAddGoalForm}>
                    Add Goal
                </Button>
            </div>
            {data.map(goal =>
                <div className='mb-2' key={goal.id}>
                    <GoalItem
                        goal={goal}
                        onEdit={handleEditGoal}
                        onDelete={handleDeleteGoal}
                    />
                </div>
            )}
            <AddGoalForm
                show={showModal}
                onClose={handleToggleAddGoalForm}
                onSubmit={handleSubmitGoalForm}
                goal={editedGoal}
            />
        </div>
    );
}

export default GoalsList;
