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

YaMap.init('06c72fe6-477e-42ef-86b1-4fa7f012eb6f');

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'light';

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <DataProvider>
          <Host>
            <Navigation />
          </Host>
        </DataProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

export default App;
