import { Modal, Row, Col } from 'react-bootstrap';
import MonthlyPieChart from '../BudgetCharts/MonthlyPieChart';
import { fetchPieChart } from '../../../../services/apiService';
import MonthlyTransactionView from '../MonthlyTransactionsView';

const MonthlyModal = ({ month, show, onHide }) => {
    const { data, error, isLoading } = fetchPieChart(month);

    if (error) {
        return <div>Failed to load chart data</div>;
    }
    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <Modal show={show} onHide={onHide} size='xl' centered>
            <Modal.Header closeButton className='container-background heading-text'>
                <Modal.Title className='text-uppercase fw-bold'>{month} Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body className='pt-0 rounded container-background'>
                <Row className='mx-5'>
                    <Col sm={7}>
                        <MonthlyPieChart data={data} />
                    </Col>
                    <Col sm={5} className='d-flex flex-column justify-content-center'>
                        <div className='card'>
                            <div className='card-header fw-bold fs-5 text-center'>
                                {month} Report
                            </div>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <div className='row'>
                                        <div className='col-6 text-start'>Total Deposits:</div>
                                        <div className='col-6'>{data.totalDeposits}</div>
                                    </div>
                                </li>
                                <li className='list-group-item'>
                                    <div className='row'>
                                        <div className='col-6 text-start'>Total Expenses:</div>
                                        <div className='col-6'>{data.totalExpenses}</div>
                                    </div>
                                </li>
                                <li className='list-group-item'>
                                    <div className='row'>
                                        <div className='col-6 text-start fw-bold'>Net Balance:</div>
                                        <div className='col-6'>{data.netBalance}</div>
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
}

export default MonthlyModal;
