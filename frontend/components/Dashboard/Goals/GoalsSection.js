'use client';

import GoalItem from './GoalItem';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import AddGoalForm from './GoalForms/AddGoalForm';
import CompletedGoals from './CompletedGoalsModal';
import { useSWRConfig } from 'swr';

import { fetchGoals, deleteGoal, updateGoal, createGoal } from '../../../services/apiService';

const GoalsSection = () => {
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
        setEditedGoal(null);
        setShowModal(!showModal);
    }

    const handleToggleCompleted = () => {
        setShowCompletedModal(!showCompletedModal);
    }

    return (
        <>
            <div className='container'>
                <div className='row mt-3'>
                    <div className='col text-start'>
                        <Button
                            className='btn btn-primary btn-sm mt-1 fs-6'
                            onClick={handleToggleAddGoalForm}
                        >
                            <i className='bi bi-plus-lg'></i>
                        </Button>
                    </div>
                    <div className='col text-center'>
                        <h2 className='text-uppercase fw-bold fs-2'>Goals</h2>
                    </div>
                    <div className='col text-end'>
                        <button
                            className='btn btn-link link-offset-1 link-underline link-underline-opacity-0 fst-italic link-underline-opacity-75-hover text-nowrap'
                            onClick={handleToggleCompleted}
                        >
                            View Completed
                        </button>
                    </div>
                </div>
            </div>
            {
                data && data.filter(goal => goal.status === 'ACTIVE').length > 0
                    ? data
                        .filter(goal => goal.status === 'ACTIVE')
                        .map(goal =>
                            <div className='mb-2' key={goal.id}>
                                <GoalItem
                                    goal={goal}
                                    onEdit={handleEditGoal}
                                    onDelete={handleDeleteGoal}
                                />
                            </div>
                        )
                    : <div className='d-flex justify-content-center align-items-center text-center mt-3'>
                        <div className='alert alert-info' role='alert'>
                            No active goals! Click the '+' button to add a new goal.
                        </div>
                    </div>
            }
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
        </>
    );
}

export default GoalsSection;
