export interface Note {
  id: string;
  title: string;
  audioUri: string;
  duration: number;
  createdAt: number;
  dateLabel: string;
  dateShort: string;
  folderId: string;
  tags: string[];
  isUnread: boolean;
  excerpt: string;
  transcript?: TranscriptSegment[];
  summary?: SummaryBlock[];
}

export interface TranscriptSegment {
  startMs: number;
  endMs: number;
  text: string;
  speakerId?: string;
}

export interface SummaryBlock {
  type: 'h1' | 'h2' | 'p' | 'ul' | 'todo' | 'quote' | 'tags' | 'meta';
  text?: string;
  items?: string[];
}

export interface Folder {
  id: string;
  name: string;
  kanji: string;
  noteCount: number;
}

export interface Settings {
  theme: 'paper' | 'night';
  typeScale: 'small' | 'regular' | 'large';
  aaaContrast: boolean;
  reducedMotion: boolean;
  language: 'english' | 'ja' | 'auto';
  autoTranscribe: boolean;
  speakerDetection: boolean;
  summaryLength: 'terse' | 'brief' | 'detailed';
  autoTitle: boolean;
  autoTags: boolean;
}

export type NotesAction =
  | {type: 'ADD_NOTE'; note: Note}
  | {type: 'UPDATE_NOTE'; id: string; updates: Partial<Note>}
  | {type: 'DELETE_NOTE'; id: string}
  | {type: 'SET_NOTES'; notes: Note[]}
  | {type: 'MARK_READ'; id: string};
