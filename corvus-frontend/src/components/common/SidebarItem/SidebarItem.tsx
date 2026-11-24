"use client";
import React, { type ReactNode } from 'react';
import './SidebarItem.scss';
import { NavLink } from 'react-router-dom';

 type SidebarItemProps = {
	// types...
	 itemName: string;
	icon: ReactNode;
	to: string;
}

const SidebarItem = ({ itemName, icon, to }: SidebarItemProps) => {
	return (
		<li className='sidebar-item sidebar-item_layout'>
			<NavLink className='sidebar-link' to={to}>
				{icon}
				<p className='sidebar-item-name'>{itemName}</p>
			</NavLink>
		</li>
	);
};

export default SidebarItem;
