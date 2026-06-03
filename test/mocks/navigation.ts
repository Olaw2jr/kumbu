export const mockNavigate = jest.fn();
export const mockGoBack = jest.fn();
export const mockReset = jest.fn();
export const mockReplace = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    goBack: mockGoBack,
    reset: mockReset,
    replace: mockReplace,
    canGoBack: jest.fn().mockReturnValue(true),
  }),
  useRoute: () => ({
    params: {},
    name: 'Test',
  }),
  useFocusEffect: jest.fn(cb => cb()),
  useIsFocused: jest.fn().mockReturnValue(true),
}));

export function resetNavigationMocks() {
  mockNavigate.mockClear();
  mockGoBack.mockClear();
  mockReset.mockClear();
  mockReplace.mockClear();
}
