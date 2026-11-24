import './AdministrativeDashboard.scss';
import { StatCard } from '../../StatCard';
import { AdminSectionHeading } from '../../AdminSectionHeading';

import { useApi } from '../../../../hooks/useAPI';
import { getProducts } from '../../../../services/ProductService';
import { getEvents } from '../../../../services/EventService';
import { getAdmins } from '../../../../services/AdminService';

type AdministrativeDashboardProps = {
	onManageProducts?: () => void;
	onOpenCalendar?: () => void;
	// extra class to redefine grid-template-areas (inheritance) from another scss
	className?: string;
};

// the back accepts at most 100 per page; asking for the maximum lets the
// dashboard add up the stock of more than the default 12 products.
// It lives outside the component so useApi always receives the same function.
const PRODUCTS_STATS_LIMIT = 100;
const getProductsForStats = () => getProducts({ limit: PRODUCTS_STATS_LIMIT });

const AdministrativeDashboard = ({
	onManageProducts,
	onOpenCalendar,
	className = '',
}: AdministrativeDashboardProps) => {
	const products = useApi(getProductsForStats, { autoFetch: true });
	const events = useApi(getEvents, { autoFetch: true });
	const admins = useApi(getAdmins, { autoFetch: true });

	const productsList = products.data?.data ?? [];
	const productsCount = products.data?.pagination?.total ?? productsList.length;
	const availableUnits = productsList.reduce((total, product) => total + Number(product.stock), 0);
	// if there are more products than the ones received, the units sum is partial
	const isPartialUnits = productsCount > productsList.length;

	const eventsCount = events.data?.pagination?.total ?? events.data?.data.length ?? 0;
	const adminsCount = admins.data?.data.length ?? 0;

	return (
		<>
			<AdminSectionHeading panelType='Panel Administrativo' tittleAdminSection='Hogar' />
			<section className={`administrative-dashboard ${className}`.trim()}>
				<StatCard
					className='administrative-dashboard__products'
					label='Productos'
					value={productsCount}
					caption={`${availableUnits}${isPartialUnits ? '+' : ''} ${
						availableUnits === 1 && !isPartialUnits ? 'unidad disponible' : 'unidades disponibles'
					}`}
				/>
				<StatCard
					className='administrative-dashboard__events'
					label='Eventos'
					value={eventsCount}
					caption='Fechas registradas'
				/>
				<StatCard
					className='administrative-dashboard__admins'
					label='Administradores'
					value={adminsCount}
					caption='Cuentas con acceso'
				/>

				<div className='administrative-dashboard__control-center'>
					<p className='administrative-dashboard__control-center-eyebrow'>Centro de control</p>
					<h2 className='administrative-dashboard__control-center-title'>
						Todo tu universo, en un solo lugar.
					</h2>
					<p className='administrative-dashboard__control-center-text'>
						Gestiona inventario, agenda y accesos administrativos desde las secciones laterales.
					</p>

					<div className='administrative-dashboard__control-center-actions'>
						<button
							type='button'
							className='administrative-dashboard__btn administrative-dashboard__btn--primary'
							onClick={onManageProducts}
						>
							Gestionar productos
						</button>
						<button
							type='button'
							className='administrative-dashboard__btn administrative-dashboard__btn--outline'
							onClick={onOpenCalendar}
						>
							Abrir calendario
						</button>
					</div>
				</div>
			</section>
		</>
	);
};

export default AdministrativeDashboard;





// este es el bueno
// type AdministrativeDashboardProps = {
	// productsCount?: number;
	// availableUnits?: number;
	// eventsCount?: number;
	// adminsCount?: number;
	// onManageProducts?: () => void;
	// onOpenCalendar?: () => void;
	// clase extra para redefinir grid-template-areas (herencia) desde otro scss
	// className?: string;
// }
// esto hay que quitarlo luego
// const AdministrativeDashboard = ({
// 	className = '',
// }: AdministrativeDashboardProps) => {
// // ? events.data?.data.length ?? 0;

// 	return (
// 		<>
// 		<AdminSectionHeading panelType='Panel Administrativo' tittleAdminSection='Hogar'/>
// 		<section className={`administrative-dashboard ${className}`.trim()}>
// 			<StatCard
// 				className='administrative-dashboard__products'
// 				label='Productos'
// 				value={0}
// 				caption={`${0} unidades disponibles`}
// 			/>
// 			<StatCard
// 				className='administrative-dashboard__events'
// 				label='Eventos'
// 				value={0}
// 				caption='Fechas registradas'
// 			/>
// 			<StatCard
// 				className='administrative-dashboard__admins'
// 				label='Administradores'
// 				value={0}
// 				caption='Cuentas con acceso'
// 			/>

// 			<div className='administrative-dashboard__control-center'>
// 				<p className='administrative-dashboard__control-center-eyebrow'>Centro de control</p>
// 				<h2 className='administrative-dashboard__control-center-title'>Todo tu universo, en un solo lugar.</h2>
// 				<p className='administrative-dashboard__control-center-text'>
// 					Gestiona inventario, agenda y accesos administrativos desde las secciones laterales.
// 				</p>

// 				<div className='administrative-dashboard__control-center-actions'>
// 					<button
// 						type='button'
// 						className='administrative-dashboard__btn administrative-dashboard__btn--primary'
// 						// onClick={onManageProducts}
// 					>
// 						Gestionar productos
// 					</button>
// 					<button
// 						type='button'
// 						className='administrative-dashboard__btn administrative-dashboard__btn--outline'
// 						// onClick={onOpenCalendar}
// 					>
// 						Abrir calendario
// 					</button>
// 				</div>
// 			</div>
// 		</section>
// 		</>
		
// 	);
// };

// export default AdministrativeDashboard;
