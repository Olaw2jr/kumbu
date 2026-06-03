import {useState, useCallback, useEffect} from 'react';
import {storage, StorageKeys} from '@/services/storage';

export function useOnboarding() {
  const [isComplete, setIsComplete] = useState(() => {
    return storage.getBoolean(StorageKeys.ONBOARDING_COMPLETE) ?? false;
  });

  const completeOnboarding = useCallback(() => {
    storage.set(StorageKeys.ONBOARDING_COMPLETE, true);
    setIsComplete(true);
  }, []);

  return {isComplete, completeOnboarding};
}
