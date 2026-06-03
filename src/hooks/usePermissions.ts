import {useState, useCallback} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';

export type PermissionStatus = 'undetermined' | 'granted' | 'denied' | 'blocked';

export function usePermissions() {
  const [microphone, setMicrophone] = useState<PermissionStatus>('undetermined');

  const checkMicrophone = useCallback(async (): Promise<PermissionStatus> => {
    if (Platform.OS === 'ios') {
      // iOS handles permission prompts at the native level when the mic
      // is first accessed. We can't reliably check status from JS without
      // a third-party library, so we report the last known state.
      return microphone;
    }

    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );
    const status: PermissionStatus = granted ? 'granted' : 'denied';
    setMicrophone(status);
    return status;
  }, [microphone]);

  const requestMicrophone = useCallback(async (): Promise<PermissionStatus> => {
    if (Platform.OS === 'ios') {
      // On iOS, the system prompt is triggered by AVAudioSession when the
      // native recording module first accesses the mic. We set granted
      // optimistically; if the user denies, the native module will throw
      // and useAudioRecorder's error handling will catch it.
      setMicrophone('granted');
      return 'granted';
    }

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Microphone Permission',
        message: 'kumbu needs access to your microphone to record voice notes.',
        buttonPositive: 'Allow',
        buttonNegative: 'Deny',
      },
    );

    let status: PermissionStatus;
    switch (result) {
      case PermissionsAndroid.RESULTS.GRANTED:
        status = 'granted';
        break;
      case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
        status = 'blocked';
        break;
      default:
        status = 'denied';
    }

    setMicrophone(status);
    return status;
  }, []);

  const ensureMicrophone = useCallback(async (): Promise<boolean> => {
    if (Platform.OS === 'ios') {
      setMicrophone('granted');
      return true;
    }

    // Check first to avoid re-prompting if already granted
    const alreadyGranted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    );
    if (alreadyGranted) {
      setMicrophone('granted');
      return true;
    }

    const status = await requestMicrophone();
    return status === 'granted';
  }, [requestMicrophone]);

  return {
    microphone,
    checkMicrophone,
    requestMicrophone,
    ensureMicrophone,
  };
}
