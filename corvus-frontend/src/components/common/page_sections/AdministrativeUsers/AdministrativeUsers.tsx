"use client";
import React, { useState } from 'react';
import axios from 'axios';
import type { SubmitHandler } from 'react-hook-form';
import './AdministrativeUsers.scss';
import { AdminList } from './AdminList';
import { AdminForm } from '../../AdminForm';
import { AdminSectionHeading } from '../../AdminSectionHeading';
import { useApi } from '../../../../hooks'; 
import { useMutation } from '../../../../hooks/useMutation';
import { getAdmins, registerAdmin } from '../../../../services/AdminService';
import type { typeUserSchema } from '../../../../schemas/userSchema';

export type AdministrativeUsersProps = Record<string, never>;

const getErrorMessage = (error: unknown) => {
	if (axios.isAxiosError(error)) {
		return error.response?.data?.message ?? 'No se pudo registrar el administrador';
	}
	return 'Ocurrió un error inesperado';
};

const AdministrativeUsers = ({}: AdministrativeUsersProps) => {
	const {
		data: adminsResponse,
		loading: loadingAdmins,
		error: listError,
		fetch: refetchAdmins,
	} = useApi(getAdmins, { autoFetch: true });

	const { mutate: createAdmin, loading: registering } = useMutation(registerAdmin);
	const [registerError, setRegisterError] = useState<string | null>(null);

	const handleRegister: SubmitHandler<typeUserSchema> = async (values) => {
		setRegisterError(null);
		try {
			await createAdmin(values);
		} catch (error) {
			setRegisterError(getErrorMessage(error));
			throw error; // AdminForm keeps the typed values when this rejects
		}
		void refetchAdmins(); // refresh the list after a successful register
	};

	return (
		<>
			<AdminSectionHeading
				panelType='Administradores'
				tittleAdminSection='personal del sistema'
			/>
			<section className='administrative-users'>
				<AdminForm
					mode='register'
					onSubmit={handleRegister}
					loading={registering}
					errorMessage={registerError}

					// esta prop es prop drilling, en un futuro debe optimizarse
					font_size_optional='size-adminUsers'
				/>
				<AdminList
					admins={adminsResponse?.data ?? []}
					loading={loadingAdmins}
					errorMessage={listError ? 'No se pudo cargar la lista' : null}
				/>
			</section>
		</>
	);
};

export default AdministrativeUsers;