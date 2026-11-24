import { useState } from 'react';

import './Catalog.scss';
import { HeaderBar, CalendarSection, ButtonApp, HeroSection, FooterCatalog} from '../../common';
import { Product, LoginModal } from '../../features';
import { ModalProvider } from '../../../context/ModalContext'; 
import { MdOutlineArrowForward } from 'react-icons/md';
import { CatalogSection } from '../../common/page_sections/CatalogSection';

// import {FooterCAtalog}
 type CatalogProps = {
	// types...

}

const Catalog  = ({}: CatalogProps) => {
	// const [isLoginOpen, setIsLoginOpen] = useState(false);
	
	return (
		<>
		<ModalProvider>
			<HeaderBar/>
		</ModalProvider>

		<HeroSection/>

			{/* {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />} */}
		<ModalProvider>
      		<CalendarSection/>
    	</ModalProvider>
    
		<CatalogSection/>
		{/* <ButtonApp buttonText='Explorar catálogo' icon={<MdOutlineArrowForward/>}/>
		<Product
		productName="Figura de coleccion "
		price="$120.00"
		category="Figuras de anime"

		/> */}

		<FooterCatalog/>
		</>
		
	);
};

export default Catalog;
