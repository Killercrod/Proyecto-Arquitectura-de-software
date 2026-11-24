import './ButtonApp.scss';

type ButtonAppProps = {
	// types...
	buttonText: string;
	typeButton?: "button" | "submit" | "reset";
	icon?: React.ReactNode;
	functionClick?: () => void;
}

const ButtonApp= ({buttonText, typeButton, icon, functionClick}: ButtonAppProps) => {
	return (
		<>
		<button type={typeButton} onClick={functionClick} className='general-button general-button_layout'>
			<p className='button-text'>{buttonText}</p>
			{icon && <div className='button-icon'>{icon}</div>}
		</button>
		</>
	);
};

export default ButtonApp;
