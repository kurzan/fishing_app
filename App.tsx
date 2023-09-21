import React from 'react';;
import {
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Navigation from './src/navigation/Navigation';
import YaMap from 'react-native-yamap';
import { MapProvider } from './src/services/providers/MapProvider';
import { DataProvider } from './src/services/providers/DataProvider';

YaMap.init('06c72fe6-477e-42ef-86b1-4fa7f012eb6f');

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (

    <MapProvider>
      <DataProvider>
        <Navigation />
      </DataProvider>
    </MapProvider>


  );
}

export default App;
