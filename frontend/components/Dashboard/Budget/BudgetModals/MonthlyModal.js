import { Modal, Row, Col, Card, ListGroup } from 'react-bootstrap';
import MonthlyPieChart from '../BudgetCharts/MonthlyPieChart';
import { fetchPieChart } from '../../../../services/apiService';
import MonthlyTransactionView from '../MonthlyTransactionsView';
import { formatString } from 'utils/helpers';

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
            <Modal.Header closeButton className='container-background custom-warning'>
                <Modal.Title className='ms-2 text-uppercase fs-2 fw-bold w-100 text-center'>{month} Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body className='pt-0 rounded container-background'>
                <Row className='mx-5'>
                    <Col sm={7}>
                        <MonthlyPieChart data={data} />
                    </Col>
                    <Col sm={5} className='d-flex flex-column justify-content-center'>
                        <Card>
                            <Card.Header className='contrast-heading'>
                                <h3 className='fs-5 fw-bold text-center m-0'>
                                    {formatString(month)} Report
                                </h3>
                            </Card.Header>
                            <Card.Body className='container-background'>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item style={{ backgroundColor: '#EFF6E0' }}>
                                        <div className='row nav-text'>
                                            <div className='col'>Total Deposits:</div>
                                            <div className='col text-end'>${Number(data.totalDeposits).toFixed(2)}</div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item style={{ backgroundColor: '#EFF6E0' }}>
                                        <div className='row nav-text'>
                                            <div className='col'>Total Expenses:</div>
                                            <div className='col text-end'>${Number(data.totalExpenses).toFixed(2)}</div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item style={{ backgroundColor: '#EFF6E0' }}>
                                        <div className='row nav-text'>
                                            <div className='col fw-bold'>{formatString(month)} Net:</div>
                                            <div className={`col fw-bold text-end ${Number(data.netBalance) < 0 ? 'red-text' : ''}`}>
                                                {Number(data.netBalance) < 0 ? '-$' : '+$'}
                                                {Math.abs(Number(data.netBalance)).toFixed(2)}
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className='me-1 px-2'>
                    <Col sm={12} className='modal-tx-custom overflow-y-auto px-2'>
                        <MonthlyTransactionView month={data} />
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
}

export default MonthlyModal;
