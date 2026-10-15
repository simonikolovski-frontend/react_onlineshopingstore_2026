// createContext creates the shared theme context.
// useContext lets components use the theme.
// useEffect applies the theme class to <body>.
import {
  createContext,
  useContext,
  useEffect
} from 'react';


// Our custom localStorage hook.
import useLocalStorage from '../hooks/useLocalStorage.jsx';


// ==================================================
// 1. CREATE CONTEXT
// ==================================================

const ThemeContext = createContext();


// ==================================================
// 2. THEME PROVIDER
// ==================================================

export function ThemeProvider({ children }) {

  // Instead of useState,
  // we now use useLocalStorage.
  //
  // "theme" is the key in localStorage.
  // "dark" is the default value.
  const [theme, setTheme] =
    useLocalStorage('theme', 'dark');


  // ==================================================
  // TOGGLE THEME
  // ==================================================

  function toggleTheme() {

    setTheme(previousTheme => {

      if (previousTheme === 'dark') {
        return 'light';
      }

      return 'dark';

    });

  }


  // ==================================================
  // APPLY THEME TO BODY
  // ==================================================

  useEffect(() => {

    // Remove old theme classes.
    document.body.classList.remove(
      'darkTheme',
      'lightTheme'
    );


    // Add the current theme.
    if (theme === 'dark') {

      document.body.classList.add(
        'darkTheme'
      );

    } else {

      document.body.classList.add(
        'lightTheme'
      );

    }

  }, [theme]);


  // ==================================================
  // PROVIDER
  // ==================================================

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme
      }}
    >

      {children}

    </ThemeContext.Provider>
  );
}


// ==================================================
// 3. CUSTOM HOOK
// ==================================================

export function useTheme() {

  const context = useContext(ThemeContext);


  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider'
    );
  }


  return context;
}