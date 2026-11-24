// utils/getAdminErrorMessage.ts
import { isAxiosError } from 'axios';

export const getAdminErrorMessage = (error: unknown, mode: 'login' | 'register'): string | null => {
	if (!error) return null;

	if (isAxiosError(error)) {
		const status = error.response?.status;
		if (status === 429) return 'Demasiados intentos, espera un momento';
		if (mode === 'login' && status === 401) return 'Correo o contraseña incorrectos';
		if (mode === 'register' && (status === 401 || status === 403)) {
			return 'Tu sesión expiró o no tienes permiso para registrar administradores';
		}
		if (mode === 'register' && status === 409) return 'Datos duplicados';
	}
	return 'Ocurrió un error, intenta de nuevo';
};