'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Row, Col } from 'react-bootstrap';
import MonthlyPieChart from '../BudgetCharts/MonthlyPieChart';
import { fetchPieChart } from '../../../../services/apiService';
import MonthlyTransactionView from '../MonthlyTransactionsView';

const MonthlyModal = ({ month, show, onHide }) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchPieChart(month);
                setData(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [month]);

    if (isLoading) return <div>Loading...</div>;
    if (data === null) return <div>Error fetching data</div>;

    return (
        <Modal show={show} onHide={onHide} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-uppercase fw-bold">{month} Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body className="pt-0">
                <Row className="mx-5">
                    <Col sm={7}>
                        <MonthlyPieChart data={data} />
                    </Col>
                    <Col sm={5} className="d-flex flex-column justify-content-center">
                        <div className="card">
                            <div className="card-header fw-bold fs-5 text-center">
                                {month} Report
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-6 text-start">Total Deposits:</div>
                                        <div className="col-6">{data.totalDeposits}</div>
                                        {/* <div className="col-6 text-end pe-4">$30000</div> */}
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-6 text-start">Total Expenses:</div>
                                        <div className="col-6">{data.totalExpenses}</div>
                                        {/* <div className="col-6 text-end pe-4">$21000</div> */}
                                    </div>
                                </li>
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-6 text-start fw-bold">Net Balance:</div>
                                        <div className="col-6">{data.netBalance}</div>
                                        {/* <div className="col-6 text-end pe-4 fw-bold text-success">$9000</div> */}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <MonthlyTransactionView month={data} />
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default MonthlyModal;
