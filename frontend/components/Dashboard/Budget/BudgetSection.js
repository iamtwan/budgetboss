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
    }

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedMonth(null);
    }

    return (
        <div className='col'>
            <div className='container m-2'>
                <div className='col'>
                    <div className='mt-3 row'>
                        <h2 className='fw-bold text-center text-uppercase fs-2'>Budget</h2>
                    </div>
                    <div className='row mt-4'>
                        <BudgetChart onMonthClick={handleMonthClick} />
                        {selectedMonth && (
                            <MonthlyModal
                                month={selectedMonth}
                                show={showModal}
                                onHide={handleModalClose}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BudgetSection;
