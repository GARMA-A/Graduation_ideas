import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import type { NoteType } from "./NoteType";


const apiURL = import.meta.env.VITE_URL as string;


// export function DBreadAllNotes() {
//
//   return async function(dispatch: AppDispatch) {
//
//     const apiURL = import.meta.env.VITE_URL;
//
//     dispatch(fetchNotesStart());
//     try {
//       const response = await fetch(`${apiURL}/api/notes/getAll`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch notes');
//       }
//       const data: NoteType[] = await response.json();
//       dispatch(fetchNotesSuccess(data));
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Unknown error';
//       dispatch(fetchNotesFailure(message));
//     }
//   };
// }
//
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

// export function DBupdate(note: NoteType) {
//   return async function(dispatch: AppDispatch) {
//
//     const apiURL = import.meta.env.VITE_URL;
//     dispatch(fetchNotesStart());
//     try {
//       const response = await fetch(`${apiURL}/api/notes/update/${note._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(note),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch notes');
//       }
//       const data: NoteType = await response.json();
//       dispatch(updateNoteSuccess(data));
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Unknown error';
//       dispatch(fetchNotesFailure(message));
//     }
//   };
// }
//

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
    }
  });
}

// export function DBdelete(noteID: string) {
//   return async function(dispatch: AppDispatch) {
//     const apiURL = import.meta.env.VITE_URL;
//     dispatch(fetchNotesStart());
//     try {
//       const response = await fetch(`${apiURL}/api/notes/delete/${noteID}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) {
//         throw new Error('Failed to delete note');
//       }
//       dispatch(deleteNoteSuccess(noteID));
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Unknown error';
//       dispatch(fetchNotesFailure(message));
//     }
//   };
// }
//
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

// export function DBcreate(note: NoteType) {
//   return async function(dispatch: AppDispatch) {
//     const apiURL = import.meta.env.VITE_URL;
//     dispatch(fetchNotesStart());
//     try {
//       const response = await fetch(`${apiURL}/api/notes/create`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ title: note.title, description: note.description, favorite: note.favorite }),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to create note');
//       }
//       const data: NoteType = await response.json();
//       dispatch(createNoteSuccess({ _id: data._id, title: data.title, description: data.description, favorite: data.favorite }));
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Unknown error';
//       dispatch(fetchNotesFailure(message));
//     }
//   };
// }

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

// export function DBtoggleFavorite(noteID: string) {
//   return async function(dispatch: AppDispatch) {
//     const apiURL = import.meta.env.VITE_URL;
//     dispatch(fetchNotesStart());
//     try {
//       const response = await fetch(`${apiURL}/api/notes/toggleFavorite/${noteID}`, {
//         method: 'PUT',
//       });
//       if (!response.ok) {
//         throw new Error('Failed to toggle favorite');
//       }
//       dispatch(toggleFavoriteNoteSuccess(noteID));
//     } catch (error) {
//       const message = error instanceof Error ? error.message : 'Unknown error';
//       dispatch(fetchNotesFailure(message));
//     }
//   };
// }

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


