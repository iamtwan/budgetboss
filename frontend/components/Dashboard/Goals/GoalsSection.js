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
        <div className='container h-75'>
            <div className='row mt-3'>
                <div className='col text-start ms-1'>
                    <Button
                        id='btn-add'
                        className='btn btn-sm mt-1 fs-6'
                        onClick={handleToggleAddGoalForm}
                    >
                        <i className='bi bi-plus-lg'></i>
                    </Button>
                </div>
                <div className='col text-center'>
                    <h2 className='text-uppercase fw-bold fs-2 heading-text text-nowrap'><i class='bi bi-dash'></i>Goals<i class='bi bi-dash'></i></h2>
                </div>
                <div className='col text-end me-1'>
                    <Button
                        id='btn-completed-goals'
                        className='btn btn-sm fs-6 mt-1 z-0 position-relative'
                        onClick={handleToggleCompleted}
                    >
                        <i class='bi bi-list-check'></i>
                    </Button>
                </div>
            </div>
            <div className='row mt-3 h-100 overflow-y-scroll rounded me-1'>
                <div className='col'>
                    <div className='row'>
                        {
                            data && data.filter(goal => goal.status === 'ACTIVE').length > 0
                                ? data
                                    .filter(goal => goal.status === 'ACTIVE')
                                    .map(goal =>
                                        <div key={goal.id} className=''>
                                            <GoalItem
                                                goal={goal}
                                                onEdit={handleEditGoal}
                                                onDelete={handleDeleteGoal}
                                            />
                                        </div>
                                    )
                                : <div className='d-flex justify-content-center align-items-center text-center mt-3'>
                                    <div id='goal-msg-bg' className='alert alert-info' role='alert'>
                                        No active goals! Click the '+' button to add a new goal.
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
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

export default GoalsSection;
