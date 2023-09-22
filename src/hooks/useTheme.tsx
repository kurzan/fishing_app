import React, { useContext } from 'react';
import { ThemeContext } from '../services/providers/ThemeProvider';

export const useTheme = () => useContext(ThemeContext);
