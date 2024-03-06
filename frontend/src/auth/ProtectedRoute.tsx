import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
	const { isAuthenticated, isLoading } = useAuth0();

	// todo : In future i will updated loading animation changing null
	if (isLoading) {
		return null;
	}

	if (isAuthenticated) {
		return <Outlet />;
	}

	return <Navigate to='/' replace />;
	// return isAuthenticated ? <Outlet /> : <Navigate to='/' replace />;
};

export default ProtectedRoute;
