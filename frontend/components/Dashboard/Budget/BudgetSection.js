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
        <div className='container d-flex flex-column h-100 pb-3'>
            <div className='p-4'>
                <h2 className='fw-bold text-center text-uppercase fs-2 dark-text'>
                    <i className="bi bi-dash-lg"></i>Budget<i className="bi bi-dash-lg"></i>
                </h2>
            </div>
            <div className='flex-grow-1 d-flex align-items-center justify-content-center'>
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
