import { MainTittle } from '../../MainTittle';
import { GuideText } from '../../GuideText';
import { ButtonApp } from '../../ButtonApp';
import { CiCalendar } from "react-icons/ci";


import { useModalContext } from "../../../../context/ModalContext";
import { Modal } from "../../Modal";
import {CalendarModal} from '../../../features';
import './CalendarSection.scss';

 type CalendarSectionProps = {
	// types...
}

const CalendarSection  = ({}: CalendarSectionProps) => {
	const { setState } = useModalContext();
	return (
		<>
		<section className='calendar-section calendar-section_layout'>
 			<article className='calendar-section--content'>
				<div className='section-identity'>
					<GuideText guideText='Próximas paradas'/>
					<MainTittle tittle='Nos vemos en tu universo'/>
					<p className='identity-text'>Ferias, convenciones, bazares y encuentros  donde podrás
						descubrir nuestras <br className='break'/>piezas en persona
					</p>
				</div>

				<div className='section-calendarBtn'>
					<p className='calendar-text'>No te pierdas los eventos</p>
					<ButtonApp buttonText='Abrir calendario' icon={<CiCalendar/>} functionClick={() => setState(true)}/>
					

				</div>
			</article>
 		</section>

		 <Modal>
            <CalendarModal />
        </Modal>
		</>
		
	);
};

export default CalendarSection;
