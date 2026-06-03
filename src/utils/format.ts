export function formatTime(seconds: number): string {
  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(Math.floor(seconds % 60)).padStart(2, '0');
  return `${mm}:${ss}`;
}

export function formatTimerMs(ms: number): {mm: string; ss: string; cs: string} {
  return {
    mm: String(Math.floor(ms / 60000)).padStart(2, '0'),
    ss: String(Math.floor((ms / 1000) % 60)).padStart(2, '0'),
    cs: String(Math.floor((ms / 10) % 100)).padStart(2, '0'),
  };
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function padCount(n: number): string {
  return String(n).padStart(2, '0');
}
