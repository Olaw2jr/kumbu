declare module 'react-native-tts' {
  interface TtsEvent {
    utteranceId: string;
  }

  interface Voice {
    id: string;
    name: string;
    language: string;
  }

  interface Subscription {
    remove(): void;
  }

  const Tts: {
    getInitStatus(): Promise<string>;
    speak(text: string, options?: object): Promise<string>;
    stop(): Promise<void>;
    setDefaultLanguage(language: string): Promise<string>;
    setDefaultRate(rate: number): Promise<string>;
    setDefaultPitch(pitch: number): Promise<string>;
    setDefaultVoice(voiceId: string): Promise<string>;
    voices(): Promise<Voice[]>;
    addEventListener(event: string, handler: Function): Subscription;
  };
  export default Tts;
}

declare module 'react-native-nitro-sound' {
  interface RecordBackType {
    currentPosition: number;
    currentMetering?: number;
  }

  interface PlayBackType {
    currentPosition: number;
    duration: number;
    currentDurationSec?: number;
  }

  export default class AudioRecorderPlayer {
    setSubscriptionDuration(sec: number): void;
    startRecorder(uri?: string, audioSets?: object): Promise<string>;
    stopRecorder(): Promise<string>;
    pauseRecorder(): Promise<string>;
    resumeRecorder(): Promise<string>;
    startPlayer(uri: string): Promise<string>;
    stopPlayer(): Promise<void>;
    pausePlayer(): Promise<void>;
    resumePlayer(): Promise<void>;
    seekToPlayer(ms: number): Promise<void>;
    setVolume(vol: number): Promise<void>;
    addRecordBackListener(callback: (data: RecordBackType) => void): void;
    removeRecordBackListener(): void;
    addPlayBackListener(callback: (data: PlayBackType) => void): void;
    removePlayBackListener(): void;
  }
}
