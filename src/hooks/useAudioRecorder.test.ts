import {renderHook, act} from '@testing-library/react-native';
import {useAudioRecorder} from './useAudioRecorder';

describe('useAudioRecorder', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts in idle phase', () => {
    const {result} = renderHook(() => useAudioRecorder());
    expect(result.current.phase).toBe('idle');
    expect(result.current.elapsedMs).toBe(0);
  });

  it('transitions to recording on start', async () => {
    const {result} = renderHook(() => useAudioRecorder());
    await act(async () => {
      await result.current.startRecording();
    });
    expect(result.current.phase).toBe('recording');
  });

  it('transitions to paused on pause', async () => {
    const {result} = renderHook(() => useAudioRecorder());
    await act(async () => {
      await result.current.startRecording();
    });
    await act(async () => {
      await result.current.pauseRecording();
    });
    expect(result.current.phase).toBe('paused');
  });

  it('resumes from paused', async () => {
    const {result} = renderHook(() => useAudioRecorder());
    await act(async () => {
      await result.current.startRecording();
    });
    await act(async () => {
      await result.current.pauseRecording();
    });
    await act(async () => {
      await result.current.resumeRecording();
    });
    expect(result.current.phase).toBe('recording');
  });

  it('returns to idle and file path on stop', async () => {
    const {result} = renderHook(() => useAudioRecorder());
    await act(async () => {
      await result.current.startRecording();
    });
    let filePath: string | undefined;
    await act(async () => {
      filePath = await result.current.stopRecording();
    });
    expect(result.current.phase).toBe('idle');
    expect(filePath).toBe('/tmp/sound.m4a');
  });

  it('records flagged moments', async () => {
    const {result} = renderHook(() => useAudioRecorder());
    await act(async () => {
      await result.current.startRecording();
    });
    act(() => {
      result.current.flagMoment();
    });
    expect(result.current.flaggedMoments).toHaveLength(1);
  });
});
