
import './AdminForm.scss';
import { MainTittle } from '../MainTittle';
import { ButtonApp } from '../ButtonApp';
import { BrandLogo } from '../BrandLogo';
import { GuideText } from '../GuideText';
import { IoMdLogIn, IoMdPersonAdd } from "react-icons/io";
import { IoClose, } from "react-icons/io5";
import { type typeUserSchema, userSchema } from '../../../schemas/userSchema';
import { Controller, type SubmitHandler, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type AdminFormMode = 'login' | 'register';

type AdminFormProps = {
	// this prop must be changed in a future (font-size-optional)
	font_size_optional?: string;
	mode: AdminFormMode;
	// must reject when the request fails; the error text comes through errorMessage
	onSubmit: SubmitHandler<typeUserSchema>;
	loading?: boolean;
	errorMessage?: string | null;
	// onClose?: () => void;
};

// se debe refactorizar en un utils despues
const FORM_CONTENT = {
	login: {
		guideText: 'Tu espacio administrativo',
		title: 'Bienvenido de nuevo',
		description: 'Accede al espacio administrativo para gestionar los productos',
		button: 'Ingresar',
		loadingButton: 'Ingresando...',
		icon: <IoMdLogIn />,
		emailAutoComplete: 'email',
		passwordAutoComplete: 'current-password',
	},
	register: {
		guideText: 'Nuevo administrador',
		title: 'Registrar administrador',
		description: "",
		// 'Crea una cuenta para que otra persona pueda gestionar el catálogo',
		button: 'Registrar',
		loadingButton: 'Registrando...',
		icon: <IoMdPersonAdd />,
		emailAutoComplete: 'off',
		passwordAutoComplete: 'new-password',
	},
} as const;

const AdminForm = ({font_size_optional, mode, onSubmit, loading = false, errorMessage = null, }: AdminFormProps) => {
	// const {control, handleSubmit, formState: {errors} } = useForm<typeUserSchema>({
	// 	resolver: zodResolver(userSchema),
	// 	defaultValues: {
	// 	}
	// });
	const content = FORM_CONTENT[mode];

	const { register, handleSubmit, reset, formState: { errors } } = useForm<typeUserSchema>({
		resolver: zodResolver(userSchema),
		defaultValues: { email: '', password: '' },
	});

	const submit: SubmitHandler<typeUserSchema> = async (values, event) => {
		if (loading) return;
		try {
			await onSubmit(values, event);
			if (mode === 'register') reset();
		} catch {
			// the parent shows the error through errorMessage; keep the typed values
		}
	};

	return (
		<>
		<div className='admin-form'>
			
			{/* onClick={() => setState(false)} aria-label="Cerrar calendario" */}
			{/* <button className='btn-close-modal' >
				<IoClose className='icon-close'/>
			</button> */}

			<div className='info-login'>
				<BrandLogo initials='SUC'/>
				<GuideText guideText={content.guideText} />
				<MainTittle tittle={content.title} className={font_size_optional} />
				{content.description && (<p className='login-admin-text'>{content.description}</p>)}
				{/* <GuideText guideText='Tu espacio administrativo'/>
				<MainTittle tittle='{'/>
				<p className='login-admin-text'>Accede al espacio administrativo para gestionar los productos</p> */}
			</div>

 			<form className='login-form' onSubmit={handleSubmit(submit)}>
				<label className='label-form-login'  htmlFor={`${mode}-email`}>Correo</label>
				<input
					id={`${mode}-email`}
					className='input-form-login'
					type='email'
					placeholder='soft@mail.com'
					autoComplete={content.emailAutoComplete}
					{...register('email')}
				/>
				{errors.email && <p className='login-form__error'>{errors.email.message}</p>}
				{/* <input className='input-form-login' placeholder='soft@mail.com' type='email'></input> */}

				<label className='label-form-login'  htmlFor={`${mode}-password`}>Contraseña</label>
				<input
					id={`${mode}-password`}
					className='input-form-login'
					type='password'
					placeholder='Ingresa la contraseña'
					autoComplete={content.passwordAutoComplete}
					{...register('password')}
				/>
				{errors.password && <p className='login-form__error'>{errors.password.message}</p>}

				{errorMessage && <p className='login-form__error' role='alert'>{errorMessage}</p>}
				{/* <input className='input-form-login' type='password' placeholder='Ingresa la contraseña'></input> */}

				<div className='btn-form-container'>
					<ButtonApp typeButton="submit"
					 	buttonText={loading ? content.loadingButton : content.button} 
						icon={<IoMdLogIn />}
						/>
				</div>
				
			</form>
 		</div>
		</>
		
	);
};

export default AdminForm;
