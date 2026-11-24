
import './GuideText.scss';

 type GuideTextProps = {
	// types...
	guideText: string;
}

const GuideText  = ({guideText}: GuideTextProps) => {
	return (
		<>
		<p className='guide-text'>{guideText}</p>
		</>
		
	);
};

export default GuideText;
