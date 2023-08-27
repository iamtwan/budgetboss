const TaglineBlock = ({ scrollToSignUp }) => {
    return (
        <div className='row p-2 d-inline-flex'>
            <h1 className='heading-text fw-bold fs-2 text-uppercase'>Empower Your Finances, Enrich Your Future!</h1>
            <p className='heading-text fs-5 px-5 fst-italic'>'In a world where personal finance can seem chaotic with a plethora of instruments to track, <span className='fw-bold'>B</span>udget<span className='fw-bold'>B</span>oss simplifies personal finance management. With an intuitive toolset and a refined interface, you'll gain control of your money, allowing you to focus on what truly matters. Sign-up today and take control of your finances!'</p>
            <div className='d-inline-flex justify-content-center'>
                <button id='sign-up' type='button' className='text-uppercase btn border btn-lg' onClick={scrollToSignUp}>Boss Up!</button>
            </div>
        </div>
    );
}

export default TaglineBlock;
