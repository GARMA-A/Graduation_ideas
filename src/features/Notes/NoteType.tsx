export type NoteType = {
  id: string;
  title: string;
  description: string;
  favorite: boolean;
  showFullView?: boolean;
  showEditView?: boolean;
  showCreateView?: boolean;
};
