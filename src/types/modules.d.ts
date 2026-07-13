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
