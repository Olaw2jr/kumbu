const listeners: Record<string, Function[]> = {};

const TTS = {
  getInitStatus: jest.fn().mockResolvedValue('success'),
  speak: jest.fn().mockResolvedValue(undefined),
  stop: jest.fn().mockResolvedValue(undefined),
  setDefaultLanguage: jest.fn().mockResolvedValue(undefined),
  setDefaultRate: jest.fn().mockResolvedValue(undefined),
  setDefaultPitch: jest.fn().mockResolvedValue(undefined),
  setDefaultVoice: jest.fn().mockResolvedValue(undefined),
  voices: jest.fn().mockResolvedValue([
    {id: 'com.apple.ttsbundle.Samantha', name: 'Samantha', language: 'en-US'},
  ]),
  addEventListener: jest.fn((event: string, cb: Function) => {
    (listeners[event] ??= []).push(cb);
    return {
      remove: () => {
        listeners[event] = listeners[event].filter(f => f !== cb);
      },
    };
  }),
  __emit: (event: string, ...args: any[]) => {
    listeners[event]?.forEach(cb => cb(...args));
  },
  __resetListeners: () => {
    Object.keys(listeners).forEach(k => delete listeners[k]);
  },
};

export default TTS;
