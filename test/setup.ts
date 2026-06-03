import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('react-native-svg', () => {
  const React = require('react');
  const createComponent = (name: string) =>
    React.forwardRef((props: any, ref: any) =>
      React.createElement(name, {...props, ref}),
    );
  return {
    __esModule: true,
    default: createComponent('Svg'),
    Svg: createComponent('Svg'),
    Path: createComponent('Path'),
    Circle: createComponent('Circle'),
    Rect: createComponent('Rect'),
    Line: createComponent('Line'),
    G: createComponent('G'),
  };
});

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({children}: {children: React.ReactNode}) => children,
  SafeAreaView: ({children}: {children: React.ReactNode}) => children,
  useSafeAreaInsets: () => ({top: 47, bottom: 34, left: 0, right: 0}),
}));

jest.mock('react-native-haptic-feedback', () => ({
  trigger: jest.fn(),
  HapticFeedbackTypes: {
    impactLight: 'impactLight',
    impactMedium: 'impactMedium',
  },
}));
