import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils/session';
const ProtectedRoute = () => {
    return getToken() ? <Outlet /> : <Navigate to='/' replace />;
	// const isAuthenticated = Boolean(localStorage.getItem('token')); // adjust to how you store the session

	// return isAuthenticated ? <Outlet /> : <Navigate to='/admin/login' replace />;
};

export default ProtectedRoute;