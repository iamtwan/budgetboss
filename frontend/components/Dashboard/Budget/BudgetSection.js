'use client';

import React, { useState } from 'react';
import BudgetChart from './BudgetCharts/BudgetBarChart';
import MonthlyModal from './BudgetModals/MonthlyModal';

const BudgetSection = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const handleMonthClick = (month) => {
        setSelectedMonth(month);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedMonth(null);
    };

    return (
        <>
            <h2 className='text-uppercase fw-bold fs-2 text-center mt-3'>Budget</h2>
            <BudgetChart onMonthClick={handleMonthClick} />
            {selectedMonth && (
                <MonthlyModal
                    month={selectedMonth}
                    show={showModal}
                    onHide={handleModalClose}
                />
            )}
        </>
    );
};

export default BudgetSection;
