
import './MainTittle.scss';

 type MainTittleProps = {
	// types...
	tittle: string;
	emphasizeText?: string;
	className?:string;
}

const MainTittle= ({tittle, emphasizeText, className}: MainTittleProps) => {
	return (
		<>
		<div className='main-tittle main-tittle_container'>
 			{/* <h1>Soft Universe</h1> */}
			<h2 className={`tittle ${className}`.trim()}>{tittle} <span className='tittle-emphasize'>{emphasizeText}</span></h2>
 		</div>
		</>
	);
};

export default MainTittle;
