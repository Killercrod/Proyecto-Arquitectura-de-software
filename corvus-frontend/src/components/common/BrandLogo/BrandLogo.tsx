"use client";
import React from 'react';
import './BrandLogo.scss';

 type BrandLogoProps = {
	// types...
	webName?: string;
	initials: string;
}

const BrandLogo = ({webName, initials}: BrandLogoProps) => {
	return (
		<>
		<div className='brand-logo brand-logo_layout'>
 			<div className='logo-container'>
				<span className='company-initials'>{initials}</span>
			</div>
			{ webName && <h2 className='company-name'>{webName}</h2>}
 		</div>
		</>
		
	);
};

export default BrandLogo;
