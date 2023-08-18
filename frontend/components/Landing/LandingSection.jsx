'use client'

import { useState } from 'react';
import FeatureCarousel from './LandingComponents/Carousel';
import FeatureCards from './LandingComponents/FeatureCards';
import TaglineBlock from './LandingComponents/TaglineBlock';


const LandingSection = ({ signUpRef }) => {
    const [index, setIndex] = useState(0);
    const [activeFeature, setActiveFeature] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
        setActiveFeature(selectedIndex);
    }

    const setFeature = (index) => {
        setActiveFeature(index);
        setIndex(index);
    };

    const scrollToSignUp = () => {
        signUpRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='container container-background landing-section mb-3 p-3'>
            <TaglineBlock scrollToSignUp={scrollToSignUp} />
            <hr />
            <FeatureCards activeFeature={activeFeature} setFeature={setFeature} />
            <FeatureCarousel activeIndex={index} onSelect={handleSelect} />
            <hr />
        </div>
    );
}

export default LandingSection;
