"use client";
import React from 'react';
import './IntroductionSectionTittle.scss';

export type IntroductionSectionTittleProps = {
	// types...
	introductionTittle: string;
}

const IntroductionSectionTittle= ({introductionTittle}: IntroductionSectionTittleProps) => {
	return (
		<h3 className='introduction-section__tittle introduction-tittle'>{introductionTittle}</h3>
	);
};

export default IntroductionSectionTittle;
