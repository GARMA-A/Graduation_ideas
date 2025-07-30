import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import type { UserType } from "./UserType";
import { useNavigate } from "react-router-dom";


const apiURL = import.meta.env.VITE_URL as string;



export function useLogin() {
	const navigate = useNavigate();
	const qc = useQueryClient();
	return useMutation({
		mutationFn: async (user: { email: string, password: string, rememberMe: boolean }) => {
			const res = await fetch(`${apiURL}/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(user),
				credentials: 'include',
			});
			const data = await res.json();
			console.log('Status:', res.status);
			console.log('Response body:', data);
			if (!res.ok) {

				throw new Error(data.message || 'Failed to register');
			}

			return data;

		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['login'] });
			navigate('/notes');

		},
		onError: (error: Error) => {
			console.error('Login error:', error);
		}

	});
}


export function useRegister() {
	const qc = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: async (user: UserType) => {
			const res = await fetch(`${apiURL}/api/auth/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(user),
				credentials: 'include',
			});
			const data = await res.json();
			console.log('Status:', res.status);
			console.log('Response body:', data);

			if (!res.ok) {
				throw new Error(data.message || 'Failed to register');
			}

			return data;

		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['register'] });

			navigate('/notes');

		},
		onError: (error: Error) => {
			console.error('Registration error:', error);
		}
	});
}


export function useLogout() {
	const qc = useQueryClient();
	const navigate = useNavigate();
	return useMutation({
		mutationFn: async () => {
			const res = await fetch(`${apiURL}/api/auth/logout`, {
				credentials: 'include',
			});
			const data = await res.json();
			console.log('Status:', res.status);
			console.log('Response body:', data);

			if (!res.ok) {
				throw new Error(data.message || 'Failed to logout');
			}

			return data;

		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['logout'] });
			navigate('/auth');
		},
		onError: (error: Error) => {
			console.error('logout error:', error);
		}
	});
}




export function useRefresh() {
	return useQuery<UserType, Error>({
		queryKey: ['auth'],
		queryFn: async () => {
			const res = await fetch(`${apiURL}/auth/refresh`);
			const data = await res.json();
			console.log('Status:', res.status);
			console.log('Response body:', data);
			if (!res.ok) {
				throw new Error(data.message || 'Failed to refresh');
			}
			return data;
		},
	});
}





