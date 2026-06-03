import React, {createContext, useContext, useReducer, useEffect, useCallback} from 'react';
import {Note, NotesAction} from './types';
import {getJSON, setJSON, StorageKeys} from '@/services/storage';

function notesReducer(state: Note[], action: NotesAction): Note[] {
  switch (action.type) {
    case 'SET_NOTES':
      return action.notes;
    case 'ADD_NOTE':
      return [action.note, ...state];
    case 'UPDATE_NOTE':
      return state.map(n =>
        n.id === action.id ? {...n, ...action.updates} : n,
      );
    case 'DELETE_NOTE':
      return state.filter(n => n.id !== action.id);
    case 'MARK_READ':
      return state.map(n =>
        n.id === action.id ? {...n, isUnread: false} : n,
      );
    default:
      return state;
  }
}

interface NotesContextValue {
  notes: Note[];
  dispatch: React.Dispatch<NotesAction>;
}

const NotesContext = createContext<NotesContextValue | null>(null);

export function NotesProvider({children}: {children: React.ReactNode}) {
  const [notes, dispatch] = useReducer(notesReducer, []);

  useEffect(() => {
    const saved = getJSON<Note[]>(StorageKeys.NOTES);
    if (saved) {
      dispatch({type: 'SET_NOTES', notes: saved});
    }
  }, []);

  const persistingDispatch = useCallback(
    (action: NotesAction) => {
      dispatch(action);
    },
    [],
  );

  useEffect(() => {
    setJSON(StorageKeys.NOTES, notes);
  }, [notes]);

  return (
    <NotesContext.Provider value={{notes, dispatch: persistingDispatch}}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }

  const {notes, dispatch} = context;

  const addNote = useCallback(
    (note: Note) => dispatch({type: 'ADD_NOTE', note}),
    [dispatch],
  );

  const updateNote = useCallback(
    (id: string, updates: Partial<Note>) =>
      dispatch({type: 'UPDATE_NOTE', id, updates}),
    [dispatch],
  );

  const deleteNote = useCallback(
    (id: string) => dispatch({type: 'DELETE_NOTE', id}),
    [dispatch],
  );

  const markRead = useCallback(
    (id: string) => dispatch({type: 'MARK_READ', id}),
    [dispatch],
  );

  const searchNotes = useCallback(
    (query: string) => {
      const q = query.toLowerCase();
      return notes.filter(
        n =>
          n.title.toLowerCase().includes(q) ||
          n.excerpt.toLowerCase().includes(q) ||
          n.tags.some(t => t.toLowerCase().includes(q)),
      );
    },
    [notes],
  );

  const getNotesByFolder = useCallback(
    (folderId: string) => {
      if (folderId === 'all') return notes;
      return notes.filter(n => n.folderId === folderId);
    },
    [notes],
  );

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    markRead,
    searchNotes,
    getNotesByFolder,
  };
}
