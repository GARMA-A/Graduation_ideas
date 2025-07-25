export type FormType = {
	_id: string; // Unique identifier for the form
	email: string;
	password: string;
	confirmPassword?: string; // Optional for login, required for signup
	rememberMe?: boolean; // Optional for both login and signup
	type: 'login' | 'signup'; // Distinguishes between login and signup forms
	username?: string; // Optional for signup, required for login
}
