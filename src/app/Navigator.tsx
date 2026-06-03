import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Note} from '@/state/types';
import {OnboardingScreen} from '@/screens/OnboardingScreen';
import {HomeScreen} from '@/screens/HomeScreen';
import {RecordingScreen} from '@/screens/RecordingScreen';
import {PlaybackScreen} from '@/screens/PlaybackScreen';
import {TranscriptScreen} from '@/screens/TranscriptScreen';
import {SummaryScreen} from '@/screens/SummaryScreen';
import {EditScreen} from '@/screens/EditScreen';
import {SearchScreen} from '@/screens/SearchScreen';
import {FoldersScreen} from '@/screens/FoldersScreen';
import {SettingsScreen} from '@/screens/SettingsScreen';
import {ShareScreen} from '@/screens/ShareScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Home: undefined;
  Recording: undefined;
  Playback: {note: Note};
  Transcript: {note: Note};
  Summary: {note: Note};
  Edit: {note: Note};
  Search: undefined;
  Folders: undefined;
  Settings: undefined;
  Share: {note: Note};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

interface NavigatorProps {
  initialRoute: keyof RootStackParamList;
}

export function Navigator({initialRoute}: NavigatorProps) {
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Recording"
        component={RecordingScreen}
        options={{presentation: 'fullScreenModal'}}
      />
      <Stack.Screen name="Playback" component={PlaybackScreen} />
      <Stack.Screen name="Transcript" component={TranscriptScreen} />
      <Stack.Screen name="Summary" component={SummaryScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Folders" component={FoldersScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen
        name="Share"
        component={ShareScreen}
        options={{presentation: 'transparentModal'}}
      />
    </Stack.Navigator>
  );
}
