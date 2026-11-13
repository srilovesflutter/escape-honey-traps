import {
  Fraunces_600SemiBold,
} from '@expo-google-fonts/fraunces';
import {
  SourceSans3_400Regular,
  SourceSans3_400Regular_Italic,
  SourceSans3_600SemiBold,
  SourceSans3_700Bold,
} from '@expo-google-fonts/source-sans-3';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import * as SystemUI from 'expo-system-ui';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useColorScheme } from 'react-native';

import { dark, light, type Palette } from '@/theme/colors';

const THEME_KEY = 'escape-honey-traps.theme.v1';

export type Preference = 'system' | 'light' | 'dark';

type Fonts = {
  display: string;
  body: string;
  bodyItalic: string;
  bodySemibold: string;
  bodyBold: string;
};

type ThemeValue = {
  ready: boolean;
  scheme: 'light' | 'dark';
  preference: Preference;
  colors: Palette;
  fonts: Fonts;
  cyclePreference: () => void;
  setPreference: (next: Preference) => void;
};

const ThemeContext = createContext<ThemeValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [preference, setPreferenceState] = useState<Preference>('system');
  const [hydrated, setHydrated] = useState(false);
  const [loaded, error] = useFonts({
    Fraunces_600SemiBold,
    SourceSans3_400Regular,
    SourceSans3_400Regular_Italic,
    SourceSans3_600SemiBold,
    SourceSans3_700Bold,
  });

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(THEME_KEY)
      .then((value) => {
        if (cancelled) return;
        if (value === 'light' || value === 'dark' || value === 'system') {
          setPreferenceState(value);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setHydrated(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const scheme: 'light' | 'dark' =
    preference === 'system' ? (system === 'dark' ? 'dark' : 'light') : preference;
  const colors = scheme === 'dark' ? dark : light;
  const fontsReady = loaded || Boolean(error);
  const fonts = useMemo<Fonts>(() => {
    if (!loaded) {
      return {
        display: 'serif',
        body: 'sans-serif',
        bodyItalic: 'sans-serif',
        bodySemibold: 'sans-serif',
        bodyBold: 'sans-serif',
      };
    }
    return {
      display: 'Fraunces_600SemiBold',
      body: 'SourceSans3_400Regular',
      bodyItalic: 'SourceSans3_400Regular_Italic',
      bodySemibold: 'SourceSans3_600SemiBold',
      bodyBold: 'SourceSans3_700Bold',
    };
  }, [loaded]);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.bg).catch(() => {});
  }, [colors.bg]);

  const setPreference = useCallback((next: Preference) => {
    setPreferenceState(next);
    AsyncStorage.setItem(THEME_KEY, next).catch(() => {});
  }, []);

  const cyclePreference = useCallback(() => {
    setPreferenceState((current) => {
      const next: Preference = current === 'system' ? 'light' : current === 'light' ? 'dark' : 'system';
      AsyncStorage.setItem(THEME_KEY, next).catch(() => {});
      return next;
    });
  }, []);

  const value = useMemo<ThemeValue>(
    () => ({
      ready: hydrated && fontsReady,
      scheme,
      preference,
      colors,
      fonts,
      cyclePreference,
      setPreference,
    }),
    [hydrated, fontsReady, scheme, preference, colors, fonts, cyclePreference, setPreference],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const value = useContext(ThemeContext);
  if (!value) throw new Error('useTheme must be used within ThemeProvider');
  return value;
}
