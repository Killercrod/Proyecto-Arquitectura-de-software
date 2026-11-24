
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './LoginModal.scss';
import { AdminForm } from '../../common';
import type { typeUserSchema } from '../../../schemas/userSchema';
import { getAdminErrorMessage } from '../../../utils/getAdminErrorMessage';
// import { AdminService } from '../../../services';
import { login } from '../../../services/AdminService';
import { saveSession } from '../../../utils/session';

import { useModalContext } from '../../../context/ModalContext';
type LoginModalProps = {
	// onClose: () => void;
};

const LoginModal = ({  }: LoginModalProps) => {
	const {setState} = useModalContext();

	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);


	const handleLogin = async (values: typeUserSchema) => {
		setLoading(true);
		setErrorMessage(null);
		try {
			const { call } = login(values);
			const { data } = await call; // AuthResponse
			// console.log('login response', data);
			console.log('login response', JSON.stringify(data, null, 2));
			saveSession(data.data.admin, data.data.token);
			navigate('/admin/dashboard', { replace: true });
		} catch (error) {
			setErrorMessage(getAdminErrorMessage(error, 'login') ?? 'correo o contraseña inválidos');
			throw error; // AdminForm expects onSubmit to reject on failure
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
		<div className='login-modal'>
			<div className='login-modal-content'>
				<button className='login-modal-content_close-btn' onClick={() => setState(false)} aria-label="Cerrar calendario">
					<IoClose className='icon-close'/>
				</button>

				<div className='login-modal_form'>
					<AdminForm
						mode='login'
						onSubmit={handleLogin}
						loading={loading}
						errorMessage={errorMessage}
					/>
				</div>
			
			</div>
		</div>
		</>
		
	);
};

export default LoginModal;