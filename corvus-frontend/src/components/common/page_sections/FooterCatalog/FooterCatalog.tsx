import './FooterCatalog.scss';
import { BrandLogo } from '../../BrandLogo';
import { ContactDetails } from '../../../features';

 type FooterCatalogProps = {
	// types...
}

export const FooterCatalog = ({}: FooterCatalogProps) => {
	return (
		<>
		<footer className='footer-catalog footer-catalog_layout'>
 			<div className='web-contact-information'>
				<div className='web-identity'>
					<BrandLogo 
						webName="Soft Universe Catalog"
						initials="SUC"
					/>

					<p className='web-description'>Figuras, historias y objetos par universos únicos</p>
				</div>

				<ContactDetails
					headingSocialMedia="Síguenos"
					headingContactOption="Contacto"
					mail="softuniverse@gmail.com"
					phone="9991358511"
					schedule="Lun-Vie: 10:00 - 18:00"
				/>
			</div>

			<div></div>
 		</footer>
		</>
		
	);
};

export default FooterCatalog;
