import { createContext } from 'react';
import type { Theme } from './types';

export const ThemeContext = createContext<Theme | null>(null);
