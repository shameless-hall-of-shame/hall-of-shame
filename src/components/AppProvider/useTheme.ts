import {useCallback, useEffect, useState, createContext} from 'react';

type Theme = 'light' | 'dark';

interface ThemeConfig {
  theme: Theme;
  preferredTheme?: Theme;
  darkThemeQuery: MediaQueryList;
}

const THEME_STORAGE_KEY = 'theme';

const getInitialThemeConfig = (): ThemeConfig => {
  let preferredTheme: ThemeConfig['preferredTheme'];
  try {
    let storedPreferredTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (storedPreferredTheme) {
      preferredTheme = storedPreferredTheme === 'dark' ? 'dark' : 'light';
    }
  } catch (err) {}

  const darkThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const prefersColorScheme: Theme = darkThemeQuery.matches ? 'dark' : 'light';

  const theme = preferredTheme ? preferredTheme : prefersColorScheme;

  return {
    theme,
    preferredTheme,
    darkThemeQuery,
  };
};

const setTheme = (newTheme: Theme) => {
  if (newTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  try {
    localStorage.setItem('theme', newTheme);
  } catch (err) {}

  console.log('theme set:', newTheme);
};

const useTheme = () => {
  const [themeConfig, setThemeConfig] = useState(getInitialThemeConfig);

  useEffect(() => {
    const {preferredTheme, darkThemeQuery} = themeConfig;

    const themeChangeHandler = (e: MediaQueryListEvent) => {
      if (!preferredTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    darkThemeQuery.addEventListener('change', themeChangeHandler);

    return () => {
      darkThemeQuery.removeEventListener('change', themeChangeHandler);
    };
  }, [themeConfig.darkThemeQuery, themeConfig.preferredTheme]);

  const toggleTheme = useCallback((value?: Theme) => {
    setThemeConfig((preThemeConfig) => {
      const newTheme = value
        ? value
        : themeConfig.theme === 'dark'
        ? 'light'
        : 'dark';

      setTheme(newTheme);

      return {
        ...preThemeConfig,
        theme: newTheme,
        preferredTheme: newTheme,
      };
    });
  }, []);

  return [themeConfig.theme, toggleTheme];
};

export default useTheme;

