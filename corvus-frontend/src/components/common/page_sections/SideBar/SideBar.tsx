"use client";
import React from 'react';
import './SideBar.scss';
import { BrandLogo } from '../../BrandLogo';
import { SidebarItem } from '../../SidebarItem';

// icons
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaBoxOpen, FaRegCalendarAlt, FaUserSecret } from "react-icons/fa";
// import { FaUserSecret } from "react-icons/fa";
import { ButtonApp } from '../../ButtonApp';

 type SideBarProps = {
	// types...
	username: string;
	onLogout: () => void;
}

const SideBar = ({ username, onLogout }: SideBarProps) => {
	return (
		<nav className='sidebar sidebar_layout'>
			<div>
				<BrandLogo webName='Soft Universe' initials='SUC' />
				<ul className='sidebar-list'>
					<SidebarItem 
						itemName='Inicio' 
						to='/admin/dashboard' 
						icon={<SiHomeassistantcommunitystore className='sidebar-icon' />} 
					/>
					<SidebarItem 
						itemName='Productos' 
						to='/admin/products' 
						icon={<FaBoxOpen className='sidebar-icon' />} 
					/>
					<SidebarItem 
						itemName='Calendario' 
						to='/admin/events' 
						icon={<FaRegCalendarAlt className='sidebar-icon' />} 
					/>
					<SidebarItem 
						itemName='Administradores' 
						to='/admin/users' 
						icon={<FaUserSecret className='sidebar-icon' />} 
					/>
				</ul>
			</div>

			<div className='sidebar-user-session'>
				<p className='user-session-text'>Sesión iniciada como</p>
				<p className='user-session'>{username}</p>
				<ButtonApp buttonText='Cerrar sesión' functionClick={onLogout} />
			</div>
		</nav>
	);
};

// const SideBar = ({username}: SideBarProps) => {
// 	return (
// 		<>
// 		<nav className='sidebar sidebar_layout'>
// 			<div>
// 				<BrandLogo webName='Soft Universe' initials='SUC' />
// 				<ul className='sidebar-list'>
// 					<SidebarItem
// 						itemName='Inicio'
// 						icon={<SiHomeassistantcommunitystore className='sidebar-icon'/>}
// 						href='#'
// 					/>
// 					<SidebarItem
// 						itemName='Productos'
// 						icon={<FaBoxOpen className='sidebar-icon'/>}
// 						href='#'
// 					/>
// 					<SidebarItem
// 						itemName='Calendario'
// 						icon={<FaRegCalendarAlt className='sidebar-icon'/>}
// 						href='#'
// 					/>
// 					<SidebarItem
// 						itemName='Administradores'
// 						icon={<FaUserSecret className='sidebar-icon'/>}
// 						href='#'
// 					/>
// 				</ul>
// 			</div>

// 			<div className='sidebar-user-session'>
// 				<p className='user-session-text'>Sesión iniciada como</p>
// 				<p className='user-session'>{username}</p>

// 				<ButtonApp buttonText='Cerrar sesión' />
// 			</div>
// 		</nav>
// 		</>
// 	);
// };

export default SideBar;
