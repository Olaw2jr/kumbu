import {useState, useRef, useCallback, useEffect} from 'react';
import {createSound} from 'react-native-nitro-sound';

export function useAudioPlayer(audioUri: string) {
  const playerRef = useRef<ReturnType<typeof createSound> | null>(null);
  if (playerRef.current === null) {
    playerRef.current = createSound();
  }
  const [isPlaying, setIsPlaying] = useState(false);
  const [positionMs, setPositionMs] = useState(0);
  const [durationMs, setDurationMs] = useState(0);

  useEffect(() => {
    return () => {
      playerRef.current?.stopPlayer();
      playerRef.current?.removePlayBackListener();
    };
  }, []);

  const play = useCallback(async () => {
    const player = playerRef.current!;
    await player.startPlayer(audioUri);
    player.addPlayBackListener(
      (data: {currentPosition: number; duration: number}) => {
        setPositionMs(data.currentPosition);
        setDurationMs(data.duration);
        if (data.currentPosition >= data.duration && data.duration > 0) {
          setIsPlaying(false);
        }
      },
    );
    setIsPlaying(true);
  }, [audioUri]);

  const pause = useCallback(async () => {
    await playerRef.current!.pausePlayer();
    setIsPlaying(false);
  }, []);

  const seekTo = useCallback(async (ms: number) => {
    await playerRef.current!.seekToPlayer(ms);
    setPositionMs(ms);
  }, []);

  const seekRelative = useCallback(
    async (deltaMs: number) => {
      const target = Math.max(0, Math.min(durationMs, positionMs + deltaMs));
      await seekTo(target);
    },
    [positionMs, durationMs, seekTo],
  );

  const setPosition = useCallback((ms: number) => {
    setPositionMs(ms);
  }, []);

  const progressPercent = durationMs > 0 ? (positionMs / durationMs) * 100 : 0;

  return {
    isPlaying,
    positionMs,
    durationMs,
    progressPercent,
    play,
    pause,
    seekTo,
    seekRelative,
    setPosition,
  };
}
