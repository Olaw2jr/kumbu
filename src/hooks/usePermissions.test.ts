import {renderHook, act} from '@testing-library/react-native';
import {Platform, PermissionsAndroid} from 'react-native';
import {usePermissions} from './usePermissions';

const mockCheck = jest.fn();
const mockRequest = jest.fn();

// Patch PermissionsAndroid methods directly
beforeAll(() => {
  PermissionsAndroid.check = mockCheck;
  PermissionsAndroid.request = mockRequest;
});

describe('usePermissions', () => {
  const originalPlatform = Platform.OS;

  afterEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(Platform, 'OS', {value: originalPlatform});
  });

  describe('iOS', () => {
    beforeEach(() => {
      Object.defineProperty(Platform, 'OS', {value: 'ios'});
    });

    it('reports microphone as undetermined initially', () => {
      const {result} = renderHook(() => usePermissions());
      expect(result.current.microphone).toBe('undetermined');
    });

    it('requestMicrophone resolves to granted on iOS (system handles prompt)', async () => {
      const {result} = renderHook(() => usePermissions());
      let status: string | undefined;
      await act(async () => {
        status = await result.current.requestMicrophone();
      });
      // On iOS, the system prompt is triggered by the native module itself,
      // so we optimistically return 'granted'. Real denial is handled at
      // the native level and surfaces as a recording error.
      expect(status).toBe('granted');
      expect(result.current.microphone).toBe('granted');
    });
  });

  describe('Android', () => {
    beforeEach(() => {
      Object.defineProperty(Platform, 'OS', {value: 'android'});
    });

    it('reports microphone as undetermined initially', () => {
      const {result} = renderHook(() => usePermissions());
      expect(result.current.microphone).toBe('undetermined');
    });

    it('checkMicrophone returns granted when permission is granted', async () => {
      mockCheck.mockResolvedValue(true);
      const {result} = renderHook(() => usePermissions());
      await act(async () => {
        await result.current.checkMicrophone();
      });
      expect(result.current.microphone).toBe('granted');
    });

    it('checkMicrophone returns denied when permission is not granted', async () => {
      mockCheck.mockResolvedValue(false);
      const {result} = renderHook(() => usePermissions());
      await act(async () => {
        await result.current.checkMicrophone();
      });
      expect(result.current.microphone).toBe('denied');
    });

    it('requestMicrophone requests RECORD_AUDIO permission', async () => {
      mockRequest.mockResolvedValue('granted');
      const {result} = renderHook(() => usePermissions());
      await act(async () => {
        await result.current.requestMicrophone();
      });
      expect(mockRequest).toHaveBeenCalledWith(
        'android.permission.RECORD_AUDIO',
        expect.objectContaining({
          title: expect.any(String),
          message: expect.any(String),
        }),
      );
      expect(result.current.microphone).toBe('granted');
    });

    it('requestMicrophone handles denied result', async () => {
      mockRequest.mockResolvedValue('denied');
      const {result} = renderHook(() => usePermissions());
      await act(async () => {
        await result.current.requestMicrophone();
      });
      expect(result.current.microphone).toBe('denied');
    });

    it('requestMicrophone handles never_ask_again result', async () => {
      mockRequest.mockResolvedValue(
        'never_ask_again',
      );
      const {result} = renderHook(() => usePermissions());
      await act(async () => {
        await result.current.requestMicrophone();
      });
      expect(result.current.microphone).toBe('blocked');
    });
  });

  describe('ensureMicrophone', () => {
    beforeEach(() => {
      Object.defineProperty(Platform, 'OS', {value: 'android'});
    });

    it('returns true when already granted', async () => {
      mockCheck.mockResolvedValue(true);
      const {result} = renderHook(() => usePermissions());
      let allowed: boolean | undefined;
      await act(async () => {
        allowed = await result.current.ensureMicrophone();
      });
      expect(allowed).toBe(true);
    });

    it('requests permission when not yet granted and returns result', async () => {
      mockCheck.mockResolvedValue(false);
      mockRequest.mockResolvedValue('granted');
      const {result} = renderHook(() => usePermissions());
      let allowed: boolean | undefined;
      await act(async () => {
        allowed = await result.current.ensureMicrophone();
      });
      expect(allowed).toBe(true);
    });

    it('returns false when request is denied', async () => {
      mockCheck.mockResolvedValue(false);
      mockRequest.mockResolvedValue('denied');
      const {result} = renderHook(() => usePermissions());
      let allowed: boolean | undefined;
      await act(async () => {
        allowed = await result.current.ensureMicrophone();
      });
      expect(allowed).toBe(false);
    });
  });
});
