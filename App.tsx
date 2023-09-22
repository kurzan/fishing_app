import React from 'react';;
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

YaMap.init('06c72fe6-477e-42ef-86b1-4fa7f012eb6f');

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'light';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <ThemeProvider>
      <DataProvider>
        <Navigation />
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
