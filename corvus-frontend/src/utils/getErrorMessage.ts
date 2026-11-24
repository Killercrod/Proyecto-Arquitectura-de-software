// utils/getErrorMessage.ts
import axios from "axios";

export const getErrorMessage = (error: unknown, fallback: string): string =>
	axios.isAxiosError(error) ? (error.response?.data?.message ?? fallback) : fallback;

// export default getErrorMessage;