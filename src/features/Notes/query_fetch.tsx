import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import type { NoteType } from "./NoteType";


const apiURL = import.meta.env.VITE_URL as string;


export function useNotes() {
  return useQuery<NoteType[], Error>({
    queryKey: ['notes'],
    queryFn: async () => {
      const r = await fetch(`${apiURL}/api/notes/getAll`, { credentials: 'include' });
      const data = await r.json();
      console.log(data);
      if (!r.ok) {
        throw new Error(data.message || 'Failed to fetch notes');
      }
      return data;
    },
  });
}


export function useUpdateNote() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (note: NoteType) => {
      const res = await fetch(`${apiURL}/api/notes/update/${note._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
        credentials: 'include',
      })

      const data = await res.json();
      console.log('Status:', res.status);
      console.log('Response body:', data);

      if (!res.ok) {
        throw new Error(data.message || 'Failed to register');
      }

      return data;

    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] });

      // queryClient.setQueryData(['notes'], (oldData: NoteType[] | undefined) => {
      //   return oldData?.map(note => note._id === variables._id ? data : note);
      // });
    }
  });
}

export function useDeleteNote() {
  const qc = useQueryClient();
  return useMutation<string, Error, string>({
    mutationFn: async (id) => {
      const res = await fetch(`${apiURL}/api/notes/delete/${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      console.log('Status:', res.status);
      console.log('Response body:', data);

      if (!res.ok) {
        throw new Error(data.message || 'Failed to register');
      }

      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['notes'] });
    }

  });
}


export function useCreateNote() {
  const qc = useQueryClient();
  return useMutation<NoteType, Error, Omit<NoteType, '_id'>>({
    mutationFn: async (note) => {
      const res = await fetch(`${apiURL}/api/notes/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: note.title, description: note.description, favorite: note.favorite }),
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
      qc.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      console.log('Error creating note:', error);
    }
  });
}

export function useToggleFavorite() {
  const qc = useQueryClient();
  return useMutation<string, Error, string>({
    mutationFn: async (id) => {
      const res = await fetch(`${apiURL}/api/notes/toggleFavorite/${id}`, {
        method: 'PUT',
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
    onSuccess: (_, id) => {
      qc.setQueryData<NoteType[]>(['notes'], (notes) =>
        notes?.map(n =>
          n._id === id ? { ...n, favorite: !n.favorite } : n
        )
      );
    },
  });
}


