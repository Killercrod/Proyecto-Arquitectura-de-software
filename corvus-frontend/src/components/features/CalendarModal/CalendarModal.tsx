import { useMemo } from 'react';
import './CalendarModal.scss';
import { GuideText, MainTittle } from '../../common';
import { useApi, useCalendar } from '../../../hooks';
import { getEvents } from '../../../services/EventService';
import type { EventItem } from '../../../models/eventType';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { useModalContext } from '../../../context/ModalContext';

type CalendarModalProps = Record<string, never>;

const WEEK_DAYS: string[] = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

// builds the same YYYY-MM-DD key the back sends in `date`
const toDateKey = (year: number, monthIndex: number, day: number) =>
	`${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

const formatTime = (time: string) => time.slice(0, 5);

const CalendarModal = ({}: CalendarModalProps) => {
	const { setState } = useModalContext();
	const { currentDate, currentMonth, goNextMonth, goPreviousMonth, calendarDays } = useCalendar();
	const { data: eventsResponse } = useApi(getEvents, { autoFetch: true });

	const formattedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

	// events grouped by date: several events can share the same day
	const eventsByDate = useMemo(() => {
		const grouped = new Map<string, EventItem[]>();
		(eventsResponse?.data ?? []).forEach((event) => {
			const key = event.date.slice(0, 10);
			grouped.set(key, [...(grouped.get(key) ?? []), event]);
		});
		return grouped;
	}, [eventsResponse]);

	return (
		<>
			<div className='calendar-modal'>
				<div className='calendar-modal-content'>
					<button className='btn-close-modal' onClick={() => setState(false)} aria-label='Cerrar calendario'>
						<IoClose className='icon-close' />
					</button>

					<div className='modal-info-text'>
						<GuideText guideText='Agenda Soft universe' />
						<MainTittle key={formattedMonth} tittle={formattedMonth} />
						<div className='additional-info'>
							<p className='additional-info-text'>Encuentranos e estos eventos</p>
							<p className='additional-info-text text-event'>
								<span className='event-icon'></span> Día de evento
							</p>
						</div>
					</div>

					<div className='calendar-web-section'>
						<button className='button-calendar' onClick={goPreviousMonth}>
							<IoIosArrowBack className='icon-btn-calendar' />
						</button>

						<div className='calendar'>
							<div className='days-week calendar-structure'>
								{WEEK_DAYS.map((nameDay) => (
									<div key={nameDay}>{nameDay}</div>
								))}
							</div>

							<div key={formattedMonth} className='month-days calendar-structure'>
								{calendarDays.map((day, index) => {
									const dayNumber = Number(day);
									const dayEvents =
										dayNumber > 0
											? eventsByDate.get(
													toDateKey(currentDate.getFullYear(), currentDate.getMonth(), dayNumber)
												)
											: undefined;

									if (!dayEvents) {
										return <div key={index} className='calendar-cell'>{day}</div>;
									}

									// keep the popover inside the calendar on the first and last columns
									const column = index % 7;
									const align =
										column < 2 ? ' calendar-cell__popover--start' : column > 4 ? ' calendar-cell__popover--end' : '';

									return (
										<div
											key={index}
											className='calendar-cell calendar-cell--event'
											tabIndex={0}
											role='button'
											aria-label={`Día ${day}, ${dayEvents.length} ${dayEvents.length === 1 ? 'evento' : 'eventos'}`}
										>
											{day}
											<div className={`calendar-cell__popover${align}`} role='tooltip'>
												{dayEvents.map(({ id, location, startTime, endTime }) => (
													<div key={id} className='calendar-cell__event'>
														<strong className='calendar-cell__place'>{location}</strong>
														<span>Inicio: {formatTime(startTime)} h</span>
														<span>Final: {formatTime(endTime)} h</span>
													</div>
												))}
											</div>
										</div>
									);
								})}
							</div>
						</div>

						<button className='button-calendar' onClick={goNextMonth}>
							<IoIosArrowForward className='icon-btn-calendar' />
						</button>
					</div>

					<p className='calendar-footer-text'>
						Pasa el cursor o selecciona una fecha marcada para ver los detalles
					</p>
				</div>
			</div>
		</>
	);
};

export default CalendarModal;

