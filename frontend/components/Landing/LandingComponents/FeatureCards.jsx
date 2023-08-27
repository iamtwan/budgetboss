const FeatureCards = ({ activeFeature, setFeature }) => {
    const renderFeatureCard = (index, title, text) => (
        <div className={`col-3-lg mb-2 mb-lg-0 ${activeFeature === index ? 'active-feature' : ''}`} onClick={() => setFeature(index)}>
            <div className='card'>
                <div className='card-body feature-cards d-flex flex-column'>
                    <h3 className='card-title mb-auto fw-bold'>{title}</h3>
                    <p className='card-text my-auto'>{text}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className='container p-3 mb-3'>
            <div className='row row-cols-sm-1 row-cols-lg-4 gx-3'>
                {renderFeatureCard(0, 'Seamless Account Management ', 'Seamlessly link your financial accounts for effortless tracking. Prefer manual entries? Manage accounts and transactions to stay in charge of your finances!')}
                {renderFeatureCard(1, 'Financial Trajectory Overview', 'Visualize your finances with an interactive 6-month financial outlook. See monthly net balances and strategize for a brighter financial future.')}
                {renderFeatureCard(2, 'In-Depth Monthly Analysis', 'Experience in-depth monthly analysis with Budget Boss! Beyond the 6-month overview, see categorical expense breakdowns and every transaction for each month.')}
                {renderFeatureCard(3, 'Financial Goal Planner', 'Financial goals aren\'t just aspirational, they\'re essential. Budget Boss offers a dedicated section to create, manage, and achieve your financial ambitions. Chart your path to success with us.')}
            </div>
        </div>
    );
}

export default FeatureCards;
