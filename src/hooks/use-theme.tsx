import SessionService from '@services/session-service';
import React from 'react';
import {Theme} from '../interfaces';
import {
  DEFAULT_DARK_THEME,
  DEFAULT_DARK_THEME_ID,
  DEFAULT_LIGHT_THEME,
  DEFAULT_LIGHT_THEME_ID,
} from '../theme';

// Our context provider will provide this object shape
interface ProvidedValue {
  theme: Theme;
  isDarkTheme: boolean;
  toggleTheme: () => void;
}
// Creating our context
// Important: the defined object here is only received by the
// consumer components when there is no rendered context provider
// in the view hierarchy, so basically it will provide
// a fallback object
const ThemeContext = React.createContext<ProvidedValue>({
  theme: DEFAULT_LIGHT_THEME,
  isDarkTheme: false,
  toggleTheme: () => {
    console.log('ThemeProvider is not rendered!');
  },
});

// Because our stateful context provider will be a React component
// we can define some props for it too
interface Props {
  initial: Theme;
  children?: React.ReactNode;
}

// Creating our stateful context provider
// We are using React.memo for optimization
export const ThemeProvider = React.memo<Props>(props => {
  // Store the actual theme as an internal state of the provider
  const [theme, setTheme] = React.useState<Theme>(props.initial);
  // Implement a method for toggling the Theme
  // We're using the React.useCallback hook for optimization
  const getThemeMode = async () => {
    const selectedTheme = await SessionService.getString('theme');
    if (selectedTheme) {
      setTheme(
        selectedTheme == DEFAULT_LIGHT_THEME_ID
          ? DEFAULT_DARK_THEME
          : DEFAULT_LIGHT_THEME,
      );
    }
  };
  getThemeMode();

  const ToggleThemeCallback = React.useCallback(() => {
    setTheme(currentTheme => {
      SessionService.storeString('theme', currentTheme?.id);

      if (currentTheme.id === DEFAULT_LIGHT_THEME_ID) {
        return DEFAULT_DARK_THEME;
      }
      if (currentTheme.id === DEFAULT_DARK_THEME_ID) {
        return DEFAULT_LIGHT_THEME;
      }
      return currentTheme;
    });
  }, []);
  // Building up the provided object
  // We're using the React.useMemo hook for optimization
  const MemoizedValue = React.useMemo(() => {
    const value: ProvidedValue = {
      theme,
      isDarkTheme: theme.id === DEFAULT_DARK_THEME_ID,
      toggleTheme: ToggleThemeCallback,
    };
    return value;
  }, [theme, ToggleThemeCallback]);
  // Render our context provider by passing it the value to provide
  return (
    <ThemeContext.Provider value={MemoizedValue}>
      {props.children}
    </ThemeContext.Provider>
  );
});

// Creating a custom context consumer hook for function components
export const useTheme = () => React.useContext(ThemeContext);
