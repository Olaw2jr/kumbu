import {useState, useEffect, useCallback} from 'react';
import Tts from 'react-native-tts';

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    Tts.getInitStatus();

    const startSub = Tts.addEventListener('tts-start', () =>
      setIsSpeaking(true),
    );
    const finishSub = Tts.addEventListener('tts-finish', () =>
      setIsSpeaking(false),
    );
    const cancelSub = Tts.addEventListener('tts-cancel', () =>
      setIsSpeaking(false),
    );

    return () => {
      startSub.remove();
      finishSub.remove();
      cancelSub.remove();
    };
  }, []);

  const speak = useCallback((text: string) => {
    Tts.speak(text);
  }, []);

  const stop = useCallback(() => {
    Tts.stop();
  }, []);

  return {speak, stop, isSpeaking};
}
