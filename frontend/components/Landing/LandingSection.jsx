'use client'


const LandingSection = ({ signUpRef }) => {
    const scrollToSignUp = () => {
        signUpRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='container container-background landing-section mb-3 p-3'>
            <div className='row p-2 d-inline-flex'>
                <h1 className='heading-text fw-bold fs-2 text-uppercase'>Empower Your Finances, Enrich Your Future!</h1>
                <p className='heading-text fs-5 px-5 fst-italic'>'In a world where personal finance can seem chaotic with a plethora of instruments to track, <span className='fw-bold'>B</span>udget<span className='fw-bold'>B</span>oss simplifies personal finance management. With an intuitive toolset and a refined interface, you'll gain control of your money, allowing you to focus on what truly matters. Sign-up today and take control of your finances!'</p>
                <div className='d-inline-flex justify-content-center'>
                    <button id='sign-up' type='button' className='text-uppercase btn border btn-lg' onClick={scrollToSignUp}>Sign me up!</button>
                </div>
            </div>
            <hr />
            <div className='container p-3'>
                <div className='row row-cols-sm-1 row-cols-lg-4 gx-3'>
                    <div className='col-3-lg mb-2 mb-lg-0'>
                        <div className='card'>
                            <div className='card-body'>
                                <h3 className='card-title'>Feature 1</h3>
                                <p className='card-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed libero ea quibusdam suscipit repellat. Facere laborum aliquid quisquam eos ex, molestias fugit autem veritatis.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-3-lg mb-2 mb-lg-0'>
                        <div className='card'>
                            <div className='card-body'>
                                <h3 className='card-title'>Feature 2</h3>
                                <p className='card-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed libero ea quibusdam suscipit repellat. Facere laborum aliquid quisquam eos ex, molestias fugit autem veritatis.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-3-lg mb-2 mb-lg-0'>
                        <div className='card'>
                            <div className='card-body'>
                                <h3 className='card-title'>Feature 3</h3>
                                <p className='card-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed libero ea quibusdam suscipit repellat. Facere laborum aliquid quisquam eos ex, molestias fugit autem veritatis.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-3-lg'>
                        <div className='card'>
                            <div className='card-body'>
                                <h3 className='card-title'>Feature 4</h3>
                                <p className='card-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed libero ea quibusdam suscipit repellat. Facere laborum aliquid quisquam eos ex, molestias fugit autem veritatis.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className='container row'></div>
        </div>
    );
}

export default LandingSection;
