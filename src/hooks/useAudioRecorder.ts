import {useState, useRef, useCallback} from 'react';
import {createSound} from 'react-native-nitro-sound';

type RecordingPhase = 'idle' | 'recording' | 'paused';

export function useAudioRecorder() {
  const recorderRef = useRef<ReturnType<typeof createSound> | null>(null);
  if (recorderRef.current === null) {
    recorderRef.current = createSound();
  }
  const [phase, setPhase] = useState<RecordingPhase>('idle');
  const [elapsedMs, setElapsedMs] = useState(0);
  const [metering, setMetering] = useState(0);
  const [flaggedMoments, setFlaggedMoments] = useState<number[]>([]);

  const startRecording = useCallback(async () => {
    const recorder = recorderRef.current!;
    recorder.setSubscriptionDuration(0.1);
    await recorder.startRecorder();
    recorder.addRecordBackListener(
      (data: {currentPosition: number; currentMetering?: number}) => {
        setElapsedMs(data.currentPosition);
        if (data.currentMetering !== undefined) {
          const normalized = Math.max(0, Math.min(1, (data.currentMetering + 60) / 60));
          setMetering(normalized);
        }
      },
    );
    setPhase('recording');
    setFlaggedMoments([]);
  }, []);

  const pauseRecording = useCallback(async () => {
    await recorderRef.current!.pauseRecorder();
    setPhase('paused');
  }, []);

  const resumeRecording = useCallback(async () => {
    await recorderRef.current!.resumeRecorder();
    setPhase('recording');
  }, []);

  const stopRecording = useCallback(async () => {
    const result = await recorderRef.current!.stopRecorder();
    recorderRef.current!.removeRecordBackListener();
    setPhase('idle');
    setElapsedMs(0);
    setMetering(0);
    return result;
  }, []);

  const flagMoment = useCallback(() => {
    setFlaggedMoments(prev => [...prev, elapsedMs]);
  }, [elapsedMs]);

  return {
    phase,
    elapsedMs,
    metering,
    flaggedMoments,
    startRecording,
    pauseRecording,
    resumeRecording,
    stopRecording,
    flagMoment,
  };
}
