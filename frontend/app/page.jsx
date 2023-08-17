import 'bootstrap/dist/css/bootstrap.css';
import LoginSignUpPage from '../components/Authentication/LoginSignUpPage';
import LandingSection from 'components/Landing/LandingSection';

const LandingPage = () => {
    return (
        <div>
            <LandingSection />
            <LoginSignUpPage />
        </div>
    );
}

export default LandingPage;
