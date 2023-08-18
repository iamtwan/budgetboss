const FeatureCards = ({ activeFeature, setFeature }) => {
    const renderFeatureCard = (index, title, text) => (
        <div className={`col-3-lg mb-2 mb-lg-0 ${activeFeature === index ? 'active-feature' : ''}`} onClick={() => setFeature(index)}>
            <div className='card'>
                <div className='card-body'>
                    <h3 className='card-title'>{title}</h3>
                    <p className='card-text'>{text}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className='container p-3 mb-3'>
            <div className='row row-cols-sm-1 row-cols-lg-4 gx-3'>
                {renderFeatureCard(0, 'Feature 1', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia veniam expedita eos aliquid, minus error sequi pariatur! Deserunt aliquam, commodi omnis quam delectus cumque aperiam beatae, doloremque nostrum sunt quidem.')}
                {renderFeatureCard(1, 'Feature 2', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore, reiciendis, doloremque iure atque sequi natus rem tenetur quo aut eius repudiandae ipsa minima in quibusdam distinctio, impedit asperiores autem praesentium!')}
                {renderFeatureCard(2, 'Feature 3', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis iste vitae soluta nihil sit repudiandae porro autem, eaque ipsum unde, deserunt expedita harum quidem deleniti error officiis quia distinctio sunt.')}
                {renderFeatureCard(3, 'Feature 4', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt aperiam ipsum assumenda labore impedit voluptatibus adipisci nostrum maxime quae magni provident consequatur illum, vitae at sit et fugiat. Earum, voluptate?')}
            </div>
        </div>
    );
}

export default FeatureCards;
