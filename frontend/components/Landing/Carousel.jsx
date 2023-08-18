import { Carousel } from 'react-bootstrap';


const FeatureCarousel = ({ activeIndex, onSelect }) => {
    return (
        <div className='container row mb-4'>
            <Carousel activeIndex={activeIndex} onSelect={onSelect} interval={null}>
                <Carousel.Item>
                    <img src='https://via.placeholder.com/800x400?text=Image1' className='d-block w-100' alt='...' />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src='https://via.placeholder.com/800x400?text=Image2' className='d-block w-100' alt='...' />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src='https://via.placeholder.com/800x400?text=Image3' className='d-block w-100' alt='...' />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src='https://via.placeholder.com/800x400?text=Image4' className='d-block w-100' alt='...' />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}


export default FeatureCarousel;
