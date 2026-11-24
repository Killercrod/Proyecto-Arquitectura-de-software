"use client";
import React from 'react';
import './EventAgenda.scss';
import { MainTittle } from '../MainTittle';
import { GuideText } from '../GuideText';
import { IntroductionSectionTittle } from '../IntroductionSectionTittle';

// this type is temporally
export type AgendaEvent = {
	id: number;
	// ISO date: "2026-10-04"
	date: string;
	name: string;
	// "11:00"
	time: string;
}

type EventAgendaProps = {
	events: AgendaEvent[];
	// extra class to inherit/override styles from the parent
	className?: string;
}

const dateFormatter = new Intl.DateTimeFormat('es-ES', {
	day: '2-digit',
	month: 'short',
	year: 'numeric',
	timeZone: 'UTC', // avoids the day shifting with the local time zone
});

const EventAgenda = ({ events, className = '' }: EventAgendaProps) => {
	return (
		<article className={`event-agenda ${className}`.trim()}>
			<div className='event-agenda__heading'>
				<GuideText guideText='Agenda' />
				<IntroductionSectionTittle introductionTittle='Eventos registrados'/>
			</div>

			{events.length === 0 ? (
				<p className='event-agenda__empty'>Aún no hay eventos registrados</p>
			) : (
				<ul className='event-agenda__list'>
					{events.map(({ id, date, name, time }) => (
						<li key={id} className='event-agenda__item'>
							<time className='event-agenda__date' dateTime={date}>
								{dateFormatter.format(new Date(date))}
							</time>

							<div className='event-agenda__info'>
								<h3 className='event-agenda__name'>{name}</h3>
								<p className='event-agenda__time'>{time} h</p>
							</div>
						</li>
					))}
				</ul>
			)}
		</article>
	);
};

export default EventAgenda;
