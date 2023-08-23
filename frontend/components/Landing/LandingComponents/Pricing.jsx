import { Card, Button, ListGroup } from 'react-bootstrap';


const PricingSection = () => {
    return (
        <div className=''>
            <h3 className='text-uppercase fw-bold nav-text mb-3 text-center fs-2'><i className='bi bi-dash-lg'></i>Pricing<i className='bi bi-dash-lg'></i></h3>
            <div className='d-flex justify-content-around m-2 pt-2'>
                <Card style={{ width: '30rem' }}>
                    <Card.Body className='pricing-container'>
                        <Card.Title className='fw-bold fs-3 text-uppercase'><span className='nav-text'>Free Tier</span></Card.Title>
                        <ListGroup className='list-group-flush'>
                            <ListGroup.Item className='fst-italic pricing-inner fw-semibold'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Manual account & transaction creation.</ListGroup.Item>
                            <ListGroup.Item className='fst-italic pricing-inner fw-semibold'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Monthly transaction pie chart.</ListGroup.Item>
                            <ListGroup.Item className='fst-italic pricing-inner fw-semibold'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Basic financial milestones.</ListGroup.Item>
                            <ListGroup.Item className='fst-italic pricing-inner fw-semibold'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Update account details anytime.</ListGroup.Item>
                            <ListGroup.Item className='fst-italic pricing-inner fw-semibold'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Secure account storage.</ListGroup.Item>
                            <ListGroup.Item className='fst-italic pricing-inner fw-semibold'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Regular access to BB support.</ListGroup.Item>
                        </ListGroup>
                        <div className='text-end'>
                            <Button id='sign-up' variant='' className='text-uppercase btn btn-lg'>Free</Button>
                        </div>
                    </Card.Body>
                </Card>
                <Card style={{ width: '30rem' }}>
                    <Card.Body className='pricing-container-prem'>
                        <Card.Title className='fw-bold fs-3 text-uppercase'><span className='nav-text'>Premium Tier</span></Card.Title>
                        <ListGroup className='list-group-flush'>
                            <ListGroup.Item className='fst-italic pricing-inner-prem fw-semibold'>* FREE TIER plus the following coming features:</ListGroup.Item>
                            <ListGroup.Item className='fst-italic pricing-inner-prem fw-semibold'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Advanced analytics</ListGroup.Item>
                            <ListGroup.Item className='fst-italic pricing-inner-prem fw-semibold'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Account-Goal integration</ListGroup.Item>
                            <ListGroup.Item className='fst-italic pricing-inner-prem fw-semibold'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Track crypto accounts</ListGroup.Item>
                            <ListGroup.Item className='fst-italic pricing-inner-prem fw-semibold'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Priority support</ListGroup.Item>
                            <ListGroup.Item className='fst-italic pricing-inner-prem fw-semibold'><i className='bi bi-piggy-bank fs-5 nav-text'></i> Upload bulk transactions</ListGroup.Item>
                        </ListGroup>
                        <div className='text-end'>
                            <Button id='sign-up' disabled variant='' className='text-uppercase btn btn-lg'>Coming Soon</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default PricingSection;
