import type { Admin } from '../models/AdminType';

const TOKEN_KEY = 'token'; // same key your axios interceptor reads
const ADMIN_KEY = 'admin';

// export const saveSession = (token: string, admin: Admin) => {
// 	localStorage.setItem(TOKEN_KEY, token);
// 	localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
// };

export const saveSession = (admin: Admin, token: string) => {
	if (!token || !admin) throw new Error('Login response is missing token or admin');
	localStorage.setItem(TOKEN_KEY, token);
	localStorage.setItem(ADMIN_KEY, JSON.stringify(admin));
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getAdmin = (): Admin | null => {
	const raw = localStorage.getItem(ADMIN_KEY);
	if (!raw) return null;
	try {
		return JSON.parse(raw) as Admin;
	} catch {
		return null;
	}
};

export const clearSession = () => {
	localStorage.removeItem(TOKEN_KEY);
	localStorage.removeItem(ADMIN_KEY);
};