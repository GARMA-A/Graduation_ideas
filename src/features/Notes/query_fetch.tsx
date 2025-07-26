import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import type { NoteType } from "./NoteType";


const apiURL = import.meta.env.VITE_URL as string;


export function useNotes() {
  return useQuery<NoteType[], Error>({
    queryKey: ['notes'],
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

export function useDeleteNote() {
  const qc = useQueryClient();
  return useMutation<string, Error, string>({
    mutationFn: async (id) => {
      const r = await fetch(`${apiURL}/api/notes/delete/${id}`, { method: 'DELETE' });
      if (!r.ok) throw new Error('Failed to delete note');
      return id;
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
      const r = await fetch(`${apiURL}/api/notes/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: note.title, description: note.description, favorite: note.favorite }),
      });
      if (!r.ok) throw new Error('Failed to create note');
      return r.json();
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
      const r = await fetch(`${apiURL}/api/notes/toggleFavorite/${id}`, { method: 'PUT' });
      if (!r.ok) throw new Error('Failed to toggle favorite');
      return id;
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


