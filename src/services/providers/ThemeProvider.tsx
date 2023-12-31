import { createContext, useMemo, useState } from "react";
import {
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { StyleSheet } from "react-native";

type TThemeContext = {
  themeStyles: any,
  isDarkMode: boolean
}

export const ThemeContext = createContext({} as TThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {

  const isDarkMode = useColorScheme() === 'dark';

  const themeStyles = StyleSheet.create({
    backgroundColor: {
      backgroundColor: isDarkMode ? 'black' : 'white'
    },
    color: {
      color: isDarkMode ? 'white' : 'black'
    },

    input: {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      borderRadius: 16,
      paddingHorizontal: 14,
      color: isDarkMode ? 'white' : 'black'
    },

    hud: {
      backgroundColor: isDarkMode ? Colors.darker : "white",
    },

    greyText: {
      color: '#828284'
    },

    error: {
      color: '#ff6f45'
    },

    bottomSheet: {
      backgroundColor: !isDarkMode ? '#FFFFFF' : '#333333',
    },

    bottomSheetHandle: {
      backgroundColor: !isDarkMode ? '#FFFFFF' : '#333333',
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8

    }

  });

  const value = useMemo(() => {
    return {
      themeStyles,
      isDarkMode
    }
  }, []);

  return <ThemeContext.Provider value={value}>
    {children}
  </ThemeContext.Provider>
};


// color: isDarkMode ? Colors.lighter : Colors.darker