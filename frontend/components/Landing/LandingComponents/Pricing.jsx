import { Card, Button, ListGroup } from 'react-bootstrap';


const PricingSection = () => {
    return (
        <div className=''>
            <h3 className='text-uppercase fw-bold nav-text mb-3 text-center fs-2'><i className='bi bi-dash-lg'></i>Pricing<i className='bi bi-dash-lg'></i></h3>
            <div className='d-flex justify-content-around m-2 pt-2'>
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title className='fw-bold fs-4 text-uppercase'><span className='nav-text'>Free Tier</span></Card.Title>
                            <ListGroup className='list-group-flush'>
                                <ListGroup.Item className='fst-italic'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Manual account & transaction creation.</ListGroup.Item>
                                <ListGroup.Item className='fst-italic'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Monthly transaction pie chart.</ListGroup.Item>
                                <ListGroup.Item className='fst-italic'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Basic financial milestones.</ListGroup.Item>
                                <ListGroup.Item className='fst-italic'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Update account details anytime.</ListGroup.Item>
                                <ListGroup.Item className='fst-italic'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Secure account storage.</ListGroup.Item>
                                <ListGroup.Item className='fst-italic'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Regular access to BB support.</ListGroup.Item>
                            </ListGroup>
                        <div className='text-end'>
                            <Button id='sign-up' variant='' className='text-uppercase btn border btn-lg'>Free</Button>
                        </div>
                    </Card.Body>
                </Card>
                <Card style={{ width: '30rem' }}>
                    <Card.Body>
                        <Card.Title className='fw-bold fs-4 text-uppercase'><span className='nav-text'>Premium Tier</span></Card.Title>
                            <ListGroup className='list-group-flush'>
                                <ListGroup.Item className='fst-italic'>* FREE TIER plus the following coming features:</ListGroup.Item>
                                <ListGroup.Item className='fst-italic'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Advanced Analytics</ListGroup.Item>
                                <ListGroup.Item className='fst-italic'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Account-Goal Integration</ListGroup.Item>
                                <ListGroup.Item className='fst-italic'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Track Crypto Accounts</ListGroup.Item>
                                <ListGroup.Item className='fst-italic'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Priority Support</ListGroup.Item>
                                <ListGroup.Item className='fst-italic'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Upload Bulk Transactions</ListGroup.Item>
                            </ListGroup>
                        <div className='text-end'>
                            <Button id='sign-up' disabled variant='' className='text-uppercase btn border btn-lg'>Coming Soon</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default PricingSection;
