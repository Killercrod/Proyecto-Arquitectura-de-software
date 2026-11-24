"use client";
import React from 'react';
import './AdminList.scss';
import { GuideText } from '../../../GuideText';
import { IntroductionSectionTittle } from '../../../IntroductionSectionTittle';
import { type Admin } from '../../../../../models';

export type AdminListProps = {
	admins: Admin[];
	loading?: boolean;
	errorMessage?: string | null;
	className?: string;
};

const AdminList = ({ admins, loading = false, errorMessage = null, className = '' }: AdminListProps) => {
	return (
		<article className={`admin-list ${className}`.trim()}>
			<div className='admin-list__heading'>
				<GuideText guideText='Lista de administradores Soft Universe' />
				<IntroductionSectionTittle introductionTittle='Administradores registrados' />
			</div>

			{loading ? (
				<p className='admin-list__status'>Cargando administradores...</p>
			) : errorMessage ? (
				<p className='admin-list__status admin-list__status--error' role='alert'>{errorMessage}</p>
			) : admins.length === 0 ? (
				<p className='admin-list__status'>Aún no hay administradores registrados</p>
			) : (
				<ul className='admin-list__list'>
					{admins.map(({ id, email }) => (
						<li key={id} className='admin-list__item'>
							<span className='admin-list__name'>{email}</span>
						</li>
					))}
				</ul>
			)}
		</article>
	);
};

export default AdminList;