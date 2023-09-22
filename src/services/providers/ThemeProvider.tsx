import { createContext, useMemo, useState } from "react";
import {
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { StyleSheet } from "react-native";

type TThemeContext = {
  themeStyles: any
}

export const ThemeContext = createContext({} as TThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

  const isDarkMode = useColorScheme() === 'dark';

  const themeStyles = StyleSheet.create({
    backgroundColor: {
      backgroundColor: isDarkMode ? Colors.darker : 'white'
    },
    color: {
      color: isDarkMode ? Colors.lighter : Colors.darker
    },

    input: {
      backgroundColor: '#EDEDED',
      borderRadius: 16,
      paddingHorizontal: 14
    },

  });

  const value = {
    themeStyles
  };

  return <ThemeContext.Provider value={value}>
    {children}
  </ThemeContext.Provider>
};