import { useState } from 'react';
import './AdministrativeEvents.scss';
import { EventAgenda } from '../../EventAgenda';
import { type AgendaEvent } from '../../EventAgenda/EventAgenda';
import { EventForm } from '../../EventForm';
import { AdminSectionHeading } from '../../AdminSectionHeading';

import { useApi } from '../../../../hooks';
import { useMutation } from '../../../../hooks/useMutation';
import { createEvent, getEvents } from '../../../../services/EventService'
import { type EventItem } from '../../../../models/eventType'; 
import { type EventSchema } from '../../../../schemas';
import { getErrorMessage } from '../../../../utils/getErrorMessage';


export type AdministrativeEventsProps = {
	// types...
}
// const eventos: AgendaEvent[] = [
// 		{id: 1, date:'2026-10-04', name:'Siglo XX', time:'11:00'},
// 		{id: 1, date:'2026-07-01', name:'convención navideña', time:'12:00'},
// 		{id: 1, date:'2026-12-31', name:'Pre-convencion', time:'13:00'},
// 		{id: 1, date:'2026-11-05', name:'Siglo XX', time:'14:00'},
// 		{id: 1, date:'2026-11-14', name:'Siglo XX', time:'15:00'},

// ];

// const toAgendaEvent = (event: EventItem): AgendaEvent => ({
// 	id: event.id,
// 	date: event.date.slice(0, 10),
// 	name: event.location,
// 	time: event.startTime.slice(0, 5),
// });

const AdministrativeEvents = ({}: AdministrativeEventsProps) => {
	const { data, loading, error, fetch: reloadEvents } = useApi(getEvents, { autoFetch: true });
	const { mutate: saveEvent, loading: saving } = useMutation(createEvent);
	const [formError, setFormError] = useState<string | undefined>(undefined);

	const isLoading = loading || (!data && !error);

	const agendaEvents: AgendaEvent[] = (data?.data ?? []).map(
		({ id, title, date, location, startTime, endTime }) => ({
			id,
			date: date.slice(0, 10),
			name: title,
			time: `${startTime.slice(0, 5)} - ${endTime.slice(0, 5)}`,
		})
	);
	console.log("eventos: ", agendaEvents);

	const handleCreateEvent = async (values: EventSchema) => {
		setFormError(undefined);
		try {
			await saveEvent(values);
			reloadEvents();
		} catch (error) {
			setFormError(getErrorMessage(error, "Crear evento"));
			throw error; // EventForm keeps the typed values when onSubmit rejects
		}
	};

	return (
		<>
		<AdminSectionHeading panelType='Panel Administrativo' tittleAdminSection='Calendario' />
		<section className='administrative-events-section administrative-events-section_layout'>
			<EventForm
				className='administrative-events__form'
				onSubmit={handleCreateEvent}
				loading={saving}
				errorMessage={formError}
			/>

			<div className='administrative-events__agenda'>
				{isLoading && <p className='administrative-events__status'>Cargando eventos...</p>}

				{error && (
					<p className='administrative-events__status' role='alert'>
						No se pudieron cargar los eventos
					</p>
				)}

				{data && <EventAgenda events={agendaEvents} />}
			</div>
		</section>
		</>
	);
};


export default AdministrativeEvents;
