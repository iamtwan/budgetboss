import { Carousel } from 'react-bootstrap';
import Image from 'next/image';


const FeatureCarousel = ({ activeIndex, onSelect }) => {
    return (
        <div className='container row mb-4 m-auto'>
            <Carousel fade activeIndex={activeIndex} onSelect={onSelect} data-bs-theme='dark' className='rounded m-0 p-0 carousel-container'>
                <Carousel.Item>
                    <Image
                        src='/images/feature_1.png'
                        width={1133}
                        height={704}
                        alt='First Slide'
                        className='d-block w-100 carousel-img'
                        quality={100}
                        priority
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        src='/images/feature_2.png'
                        width={1133}
                        height={704}
                        alt='Second Slide'
                        className='d-block w-100 carousel-img'
                        quality={100}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        src='/images/feature_3.png'
                        width={1133}
                        height={704}
                        alt='Third Slide'
                        className='d-block w-100 carousel-img'
                        quality={100}
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <Image
                        src='/images/feature_4.png'
                        width={1133}
                        height={704}
                        alt='Fourth Slide'
                        className='d-block w-100 carousel-img'
                        quality={100}
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
}


export default FeatureCarousel;
