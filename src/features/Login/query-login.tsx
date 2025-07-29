import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import type { UserType } from "./UserType";


const apiURL = import.meta.env.VITE_URL as string;


export function useUsers() {
	return useQuery<UserType[], Error>({
		queryKey: ['users'],
		queryFn: async () => {

			const r = await fetch(`${apiURL}/api/notes/getAll`);
			if (!r.ok) throw new Error('Failed to fetch notes');
			return r.json();
		},
	});
}


export function useUpdateNote() {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (note: NoteType) =>
			fetch(`${apiURL}/api/notes/update/${note._id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(note),
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

