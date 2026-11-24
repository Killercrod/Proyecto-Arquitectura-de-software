"use client";
import React from 'react';
import './AdminSectionHeading.scss';
import { GuideText } from '../GuideText';
import { MainTittle } from '../MainTittle';
 type AdminSectionHeadingProps = {
	// types...
	panelType: string;
	tittleAdminSection: string;
}

const AdminSectionHeading = ({tittleAdminSection, panelType}: AdminSectionHeadingProps) => {
	return (
		<>
		<section className='administrative-heading administrative-heading_layout'>
			<GuideText guideText={`Panel administrativo/${panelType}`} />
			<MainTittle tittle={tittleAdminSection}/>
		</section>
		</>
		
	);
};

export default AdminSectionHeading;
