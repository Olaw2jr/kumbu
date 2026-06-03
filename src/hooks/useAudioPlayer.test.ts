import {renderHook, act} from '@testing-library/react-native';
import {useAudioPlayer} from './useAudioPlayer';

describe('useAudioPlayer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('starts not playing', () => {
    const {result} = renderHook(() => useAudioPlayer('/test.m4a'));
    expect(result.current.isPlaying).toBe(false);
    expect(result.current.positionMs).toBe(0);
  });

  it('plays audio', async () => {
    const {result} = renderHook(() => useAudioPlayer('/test.m4a'));
    await act(async () => {
      await result.current.play();
    });
    expect(result.current.isPlaying).toBe(true);
  });

  it('pauses audio', async () => {
    const {result} = renderHook(() => useAudioPlayer('/test.m4a'));
    await act(async () => {
      await result.current.play();
    });
    await act(async () => {
      await result.current.pause();
    });
    expect(result.current.isPlaying).toBe(false);
  });

  it('seeks to position', async () => {
    const {result} = renderHook(() => useAudioPlayer('/test.m4a'));
    await act(async () => {
      await result.current.seekTo(30000);
    });
    expect(result.current.positionMs).toBe(30000);
  });

  it('seeks to a specific position', async () => {
    const {result} = renderHook(() => useAudioPlayer('/test.m4a'));
    await act(async () => {
      await result.current.seekTo(45000);
    });
    expect(result.current.positionMs).toBe(45000);
  });
});
