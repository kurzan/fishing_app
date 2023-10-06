import React, { useEffect } from 'react';;
import {
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Navigation from './src/navigation/Navigation';
import YaMap from 'react-native-yamap';
import { DataProvider } from './src/services/providers/DataProvider';
import { ThemeProvider } from './src/services/providers/ThemeProvider';

import {
  GestureHandlerRootView
} from 'react-native-gesture-handler';

import { Host } from 'react-native-portalize';

import SplashScreen from 'react-native-splash-screen'
import { AuthProvider } from './src/services/providers/AuthProvider';
import { useTheme } from './src/hooks/useTheme';

YaMap.init('06c72fe6-477e-42ef-86b1-4fa7f012eb6f');

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundColor = isDarkMode ? 'black' : 'white';

  const { themeStyles } = useTheme();

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <GestureHandlerRootView style={[{ flex: 1, backgroundColor }]}>
      <AuthProvider>
        <DataProvider>
          <ThemeProvider>
            <Host>
              <Navigation />
            </Host>
          </ThemeProvider>
        </DataProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default App;
