module.exports = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^react-native-tts$': '<rootDir>/test/mocks/react-native-tts',
    '^react-native-audio-recorder-player$':
      '<rootDir>/test/mocks/react-native-audio-recorder-player',
    '^react-native-mmkv$': '<rootDir>/test/mocks/react-native-mmkv',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-tts|react-native-audio-recorder-player|react-native-reanimated|react-native-svg|react-native-mmkv|@react-navigation|react-native-screens|react-native-safe-area-context|react-native-haptic-feedback|react-native-fs|react-native-share)/)',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}', '<rootDir>/test/**/*.test.{ts,tsx}'],
};
