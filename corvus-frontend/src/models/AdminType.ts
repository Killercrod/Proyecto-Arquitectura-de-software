
export interface Admin {
    id: number;
    email: string;
}

export interface AdminCredentials {
	email: string;
	password: string;
}

// type aliases instead of empty interfaces (avoids the lint rule no-empty-object-type)
export type AdminLogin = AdminCredentials;
export type AdminRegister = AdminCredentials;

export interface MessageResponse {
	success: boolean;
	message: string;
}

export interface AuthResponse extends MessageResponse {
	data: {
		token: string;
		admin: Admin;
	};
}
// export interface AdminCredentials {
//     email: string;
//     password: string;
// }

// export interface AdminRegister extends AdminCredentials {}

// export interface AdminLogin extends AdminCredentials {}

// export interface AuthResponse {
//     success: boolean;
//     message: string;
//     token: string;
//     admin: Admin;
// }
