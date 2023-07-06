// Moving pagination to backend
'use client';

import GoalItem from './GoalItem';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import AddGoalForm from './GoalForms/AddGoalForm';
import CompletedGoals from './CompletedGoalsModal';
import { useSWRConfig } from 'swr';
import ReactPaginate from 'react-paginate';
import { fetchGoals, deleteGoal, updateGoal, createGoal } from '../../../services/apiService';

const GoalsSection = () => {
    const [showModal, setShowModal] = useState(false);
    const [showCompletedModal, setShowCompletedModal] = useState(false);
    const [editedGoal, setEditedGoal] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    const { data, error, isLoading } = fetchGoals();
    const { mutate } = useSWRConfig();

    const PER_PAGE = 3;
    const offset = currentPage * PER_PAGE;

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

    const pageCount = Math.ceil(data.filter(goal => goal.status === 'ACTIVE').length / PER_PAGE);

    const currentPageData = data
        .filter(goal => goal.status === 'ACTIVE')
        .slice(offset, offset + PER_PAGE)
        .map(goal =>
            <div key={goal.id}>
                <GoalItem
                    goal={goal}
                    onEdit={handleEditGoal}
                    onDelete={handleDeleteGoal}
                />
            </div>
        );

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    }

    return (
        <div className='col'>
            <div className='container m-2'>
                <div className='col me-3'>
                    <div className='row mt-3'>
                        <div className='col text-start ms-1'>
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

                    {
                        data && data.filter(goal => goal.status === 'ACTIVE').length > 0
                            ? currentPageData
                            : <div className='d-flex justify-content-center align-items-center text-center mt-3'>
                                <div className='alert alert-info' role='alert'>
                                    No active goals! Click the '+' button to add a new goal.
                                </div>
                            </div>
                    }
                    <ReactPaginate
                        previousLabel={<i class='bi bi-arrow-left'></i>}
                        nextLabel={<i class='bi bi-arrow-right'></i>}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        previousLinkClassName={'pagination__link'}
                        nextLinkClassName={'pagination__link'}
                        disabledClassName={'pagination__link--disabled'}
                        activeClassName={'pagination__link--active'}
                    />
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
            </div>
        </div >
    );
}

export default GoalsSection;
