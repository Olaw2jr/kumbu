import Tts from 'react-native-tts';
import {initTTS, setRate, setPitch, setVoice, getVoices} from './tts';

describe('TTSService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initTTS', () => {
    it('sets default language to en-US', async () => {
      await initTTS();
      expect(Tts.setDefaultLanguage).toHaveBeenCalledWith('en-US');
    });

    it('sets default rate to 0.5', async () => {
      await initTTS();
      expect(Tts.setDefaultRate).toHaveBeenCalledWith(0.5);
    });

    it('sets default pitch to 1.0', async () => {
      await initTTS();
      expect(Tts.setDefaultPitch).toHaveBeenCalledWith(1.0);
    });
  });

  describe('setRate', () => {
    it('clamps rate to [0.01, 0.99]', async () => {
      await setRate(1.5);
      expect(Tts.setDefaultRate).toHaveBeenCalledWith(0.99);

      await setRate(-0.5);
      expect(Tts.setDefaultRate).toHaveBeenCalledWith(0.01);
    });

    it('passes valid rate through', async () => {
      await setRate(0.5);
      expect(Tts.setDefaultRate).toHaveBeenCalledWith(0.5);
    });
  });

  describe('setPitch', () => {
    it('clamps pitch to [0.5, 2.0]', async () => {
      await setPitch(3.0);
      expect(Tts.setDefaultPitch).toHaveBeenCalledWith(2.0);

      await setPitch(0.1);
      expect(Tts.setDefaultPitch).toHaveBeenCalledWith(0.5);
    });
  });

  describe('setVoice', () => {
    it('calls setDefaultVoice with the voice ID', async () => {
      await setVoice('com.apple.ttsbundle.Samantha');
      expect(Tts.setDefaultVoice).toHaveBeenCalledWith(
        'com.apple.ttsbundle.Samantha',
      );
    });
  });

  describe('getVoices', () => {
    it('returns available voices', async () => {
      const voices = await getVoices();
      expect(voices).toEqual([
        {
          id: 'com.apple.ttsbundle.Samantha',
          name: 'Samantha',
          language: 'en-US',
        },
      ]);
    });
  });
});
