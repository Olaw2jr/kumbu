import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider, useTheme} from '@/theme/ThemeProvider';
import {NotesProvider} from '@/state/NotesContext';
import {SettingsProvider} from '@/state/SettingsContext';
import {useOnboarding} from '@/hooks/useOnboarding';
import {Navigator} from './Navigator';

function AppContent() {
  const {isDark} = useTheme();
  const {isComplete} = useOnboarding();

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <NavigationContainer>
        <Navigator initialRoute={isComplete ? 'Home' : 'Onboarding'} />
      </NavigationContainer>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SettingsProvider>
          <NotesProvider>
            <AppContent />
          </NotesProvider>
        </SettingsProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
