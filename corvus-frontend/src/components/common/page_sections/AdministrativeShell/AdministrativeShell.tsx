import { Outlet, useNavigate} from 'react-router-dom';
import './AdministrativeShell.scss';
import { ModalProvider } from '../../../../context/ModalContext'; 
import { SideBar } from '../SideBar';
import { clearSession, getAdmin } from '../../../../utils/session';


type AdministrativeShellProps = {
	// types...
}

const AdministrativeShell = ({}: AdministrativeShellProps) => {
	const navigate = useNavigate();
	const admin = getAdmin();

	const handleLogout = () => {
		clearSession();
		navigate('/', { replace: true });
	};

	return (
		<>
		{/* <SideBar /> */}
		<div className='administrative-shell administrative-shell_layout'>
			<SideBar username={admin?.email ?? ''} onLogout={handleLogout} />

			<main className='admin-main-content'>
				<ModalProvider>
					<Outlet />
				</ModalProvider>

				
				{/* <AdminSectionHeading panelType='Productos' tittleAdminSection='Productos'/> */}
				{/* <AdministrativeDashboard/> */}
				{/* <AdministrativeProducts/> */}
				{/* <AdministrativeEvents /> */}
				{/* SPA content */}
			</main>
		</div>
		</>
	);
};

export default AdministrativeShell;
