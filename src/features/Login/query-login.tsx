import { useMutation, useQueryClient, } from "@tanstack/react-query";
import type { UserType } from "./UserType";


const apiURL = import.meta.env.VITE_URL as string;



export function useLogin() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (user: UserType) =>
			fetch(`${apiURL}/api/notes/update/${user._id}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(user),
			}).then(r => {
				if (!r.ok) throw new Error('Failed to update note');
				return r.json();
			}),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['notes'] });

			// queryClient.setQueryData(['notes'], (oldData: NoteType[] | undefined) => {
			//   return oldData?.map(note => note._id === variables._id ? data : note);
			// });
		}
	});
}


export function useRegister() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (user: UserType) =>
			fetch(`${apiURL}/api/notes/update/${user._id}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(user),
			}).then(r => {
				if (!r.ok) throw new Error('Failed to update note');
				return r.json();
			}),
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ['notes'] });

			// queryClient.setQueryData(['notes'], (oldData: NoteType[] | undefined) => {
			//   return oldData?.map(note => note._id === variables._id ? data : note);
			// });
		}
	});
}


