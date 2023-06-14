import React, { useState } from 'react';
import BudgetChart from './BudgetBarChart';
import MonthlyModal from './MonthlyModal';

const BudgetPage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const handleMonthClick = (monthData) => {
        setSelectedMonth(monthData);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedMonth(null);
    };

    return (
        <>
            <BudgetChart onMonthClick={handleMonthClick} />
            {selectedMonth && (
                <MonthlyModal
                    monthData={selectedMonth}
                    show={showModal}
                    onHide={handleModalClose}
                />
            )}
        </>
    );
};

export default BudgetPage;
