"use client";
import React from 'react';
import './StatCard.scss';

type StatCardProps = {
	label: string;
	value: number | string;
	caption: string;
	// permite heredar/sobrescribir estilos (por ejemplo grid-area) desde el padre
	className?: string;
}

const StatCard = ({ label, value, caption, className = '' }: StatCardProps) => {
	return (
		<article className={`stat-card ${className}`.trim()}>
			<h3 className='stat-card__label'>{label}</h3>
			<p className='stat-card__value'>{value}</p>
			<p className='stat-card__caption'>{caption}</p>
		</article>
	);
};

export default StatCard;
