import { createBrowserRouter, Navigate } from 'react-router-dom';
import AdministrativeShell from '../components/common/page_sections/AdministrativeShell/AdministrativeShell';
import { AdministrativeDashboard, AdministrativeProducts, AdministrativeEvents, AdministrativeUsers } from '../components/common/page_sections';
import { AdminForm } from '../components/common/AdminForm';
import ProtectedRoute from './ProtectedRoute';
// import App from '../App';

import { Catalog } from '../components/pages/Catalog';

 const router = createBrowserRouter([
	{ path: '/', element: <Catalog /> },
	{
		path: '/admin',
		element: <ProtectedRoute />,
		children: [
			{
				element: <AdministrativeShell />,
				children: [
					{ index: true, element: <Navigate to='dashboard' replace /> },
					{ path: 'dashboard', element: <AdministrativeDashboard /> },
					{ path: 'products', element: <AdministrativeProducts /> },
					{ path: 'events', element: <AdministrativeEvents /> },
					{ path: 'users', element: <AdministrativeUsers /> },
				],
			},
		],
	},
	{ path: '*', element: <Navigate to='/' replace /> },
]);

export default router;


// const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: <App />, // public catalog
// 	},
// 	{
// 		path: '/admin/login',
		// element:
        //  <AdminForm />,
// 	},
// 	{
// 		path: '/admin',
// 		element: <ProtectedRoute />, // blocks access if there is no session
// 		children: [
// 			{
// 				element: <AdministrativeShell />, // layout with SideBar + Outlet
// 				children: [
// 					{ index: true, element: <Navigate to='dashboard' replace /> },
// 					{ path: 'dashboard', element: <AdministrativeDashboard /> },
// 					{ path: 'products', element: <AdministrativeProducts /> },
// 					{ path: 'events', element: <AdministrativeEvents /> },
// 					{ path: 'users', element: <AdministrativeUsers /> },
// 				],
// 			},
// 		],
// 	},
// 	{ path: '*', element: <Navigate to='/' replace /> },
// ]);

// export default router;