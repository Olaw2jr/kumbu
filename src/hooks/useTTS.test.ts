import {renderHook, act} from '@testing-library/react-native';
import {useTTS} from './useTTS';
import Tts from 'react-native-tts';

describe('useTTS', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (Tts as any).__resetListeners();
  });

  describe('initialization', () => {
    it('calls getInitStatus on mount', () => {
      renderHook(() => useTTS());
      expect(Tts.getInitStatus).toHaveBeenCalled();
    });

    it('starts with isSpeaking false', () => {
      const {result} = renderHook(() => useTTS());
      expect(result.current.isSpeaking).toBe(false);
    });
  });

  describe('speak', () => {
    it('calls Tts.speak with the provided text', async () => {
      const {result} = renderHook(() => useTTS());
      await act(async () => {
        result.current.speak('Hello world');
      });
      expect(Tts.speak).toHaveBeenCalledWith('Hello world');
    });
  });

  describe('stop', () => {
    it('calls Tts.stop', async () => {
      const {result} = renderHook(() => useTTS());
      await act(async () => {
        result.current.stop();
      });
      expect(Tts.stop).toHaveBeenCalled();
    });
  });

  describe('events', () => {
    it('sets isSpeaking to true on tts-start', () => {
      const {result} = renderHook(() => useTTS());
      act(() => {
        (Tts as any).__emit('tts-start');
      });
      expect(result.current.isSpeaking).toBe(true);
    });

    it('sets isSpeaking to false on tts-finish', () => {
      const {result} = renderHook(() => useTTS());
      act(() => {
        (Tts as any).__emit('tts-start');
      });
      expect(result.current.isSpeaking).toBe(true);
      act(() => {
        (Tts as any).__emit('tts-finish');
      });
      expect(result.current.isSpeaking).toBe(false);
    });

    it('sets isSpeaking to false on tts-cancel', () => {
      const {result} = renderHook(() => useTTS());
      act(() => {
        (Tts as any).__emit('tts-start');
      });
      act(() => {
        (Tts as any).__emit('tts-cancel');
      });
      expect(result.current.isSpeaking).toBe(false);
    });
  });

  describe('cleanup', () => {
    it('registers event listeners', () => {
      renderHook(() => useTTS());
      expect(Tts.addEventListener).toHaveBeenCalledWith(
        'tts-start',
        expect.any(Function),
      );
      expect(Tts.addEventListener).toHaveBeenCalledWith(
        'tts-finish',
        expect.any(Function),
      );
      expect(Tts.addEventListener).toHaveBeenCalledWith(
        'tts-cancel',
        expect.any(Function),
      );
    });
  });
});
