import { BrandLogo } from '../../BrandLogo';
import { ButtonApp } from '../../ButtonApp';
import { FaUser } from "react-icons/fa";
import { Modal } from '../../Modal';
import { useModalContext } from '../../../../context/ModalContext';
import './HeaderBar.scss';
import { LoginModal } from '../../../features';

 type HeaderBarProps = {
	// types...
	// onclick: () => void;
}

const HeaderBar = ({}: HeaderBarProps) => {
	const {setState} = useModalContext();
	return (
		<>
		<div className='header-bar header-bar_layout'>
			<div className='header-bar-content'>
				<BrandLogo
					webName='Soft Universe Catalog'
					initials='SUC'
				/>
				<ButtonApp
					functionClick={()=>setState(true)}
					buttonText='Iniciar Sesion'
					icon={<FaUser/>}
				/>
			</div>
 			
 		</div>

		<Modal>
            <LoginModal />
        </Modal>
		</>
	);
};

export default HeaderBar;
