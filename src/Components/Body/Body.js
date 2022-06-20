import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from '../Auth/Auth.js';
import LogOut from '../Auth/logout.js';
import { connect } from 'react-redux';
import Gallery from './Gallery/Gallery.js';
import GalleryCategory from './Gallery/GalleryCategory.js';
import Feedback from './feedback/feedback.js';

const mapStateToProps = state => {
    return {
        token: state.state.auth.token,
        userId: state.state.auth.userId,
    }
}

const Body = props => {
    let authRoute = null;
    if (props.token && props.userId) {
        authRoute = <Routes>
            <Route exact path="/gallery-category" element={<GalleryCategory />} />
            <Route exact path="/gallery" element={<Gallery />} />
            <Route exact path="/feedback" element={<Feedback />} />
            <Route exact path="/logout" element={<LogOut />} />
            <Route exact path="/" element={<Navigate replace to="/gallery-category" />} />
            <Route path="*" element={<Navigate to="/gallery-category" replace />} />
        </Routes>
    } else {
        authRoute = <Routes>
            <Route exact path="/auth" element={<Auth />} />
            <Route exact path="/" element={<Navigate replace to="/auth" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    }
    return (
        <div className='py-4'>
            {authRoute}
        </div>
    );
}

export default connect(mapStateToProps)(Body);