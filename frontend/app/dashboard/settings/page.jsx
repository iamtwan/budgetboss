'use client'

import 'bootstrap/dist/css/bootstrap.css'; // development
// import 'bootstrap/dist/css/bootstrap.min.css'; // production
// import 'bootstrap-icons/font/bootstrap-icons.css';
import withAuth from '../../../components/Authentication/ProtectedRoute';


const Settings = () => {

    return (
        <div className='container main-dashboard'>
            <div className='row container-row-top container-background dash-container-rows'><p>This is a test</p></div>
        </div>
    );
}

export default withAuth(Settings);
