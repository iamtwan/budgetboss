'use client';

import React, { useState } from 'react';
import BudgetBarChart from './BudgetCharts/BudgetBarChart';
import MonthlyModal from './BudgetModals/MonthlyModal';

const BudgetSection = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
        setShowModal(true);
    }

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedMonth(null);
    }

    return (
        <div className='container d-flex flex-column align-items-center'>
            <div className='p-4'>
                <h2 className='fw-bold text-center text-uppercase fs-2 heading-text text-nowrap'>
                    <i className='bi bi-dash'></i>Monthly Budget<i className='bi bi-dash'></i>
                </h2>
            </div>
            <div className='h-100 w-100'>
                <BudgetBarChart onMonthClick={handleMonthClick} />
            </div>
            {selectedMonth && (
                <MonthlyModal
                    month={selectedMonth}
                    show={showModal}
                    onHide={handleModalClose}
                />
            )}
        </div>
    );

}

export default BudgetSection;
