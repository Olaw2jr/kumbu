import Tts from 'react-native-tts';

export async function initTTS(): Promise<void> {
  await Tts.setDefaultLanguage('en-US');
  await Tts.setDefaultRate(0.5);
  await Tts.setDefaultPitch(1.0);
}

export async function getVoices() {
  return Tts.voices();
}

export async function setRate(rate: number): Promise<void> {
  const clamped = Math.max(0.01, Math.min(0.99, rate));
  await Tts.setDefaultRate(clamped);
}

export async function setPitch(pitch: number): Promise<void> {
  const clamped = Math.max(0.5, Math.min(2.0, pitch));
  await Tts.setDefaultPitch(clamped);
}

export async function setVoice(voiceId: string): Promise<void> {
  await Tts.setDefaultVoice(voiceId);
}
