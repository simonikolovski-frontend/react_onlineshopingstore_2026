// createContext creates our Theme Context.
// useContext lets components read the Context.
// useEffect applies the selected theme to <body>.
import {
  createContext,
  useContext,
  useEffect
} from 'react';


// Our custom localStorage hook.
import useLocalStorage from '../hooks/useLocalStorage.jsx';


// ==================================================
// 1. CREATE THE CONTEXT
// ==================================================

// null is the fallback value.
//
// If a component tries to use ThemeContext
// outside ThemeProvider, the value will be null.
const ThemeContext = createContext(null);


// ==================================================
// 2. THEME PROVIDER
// ==================================================

export function ThemeProvider({ children }) {

  // ==================================================
  // THEME STATE
  // ==================================================

  // Read the saved theme from localStorage.
  //
  // If there is no saved theme,
  // start with "dark".
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

    // Remove the old theme classes.
    document.body.classList.remove(
      'darkTheme',
      'lightTheme'
    );


    // Add the current theme class.
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
  // 3. PROVIDE THE CONTEXT
  // ==================================================

  // React 19 syntax:
  //
  // We can use <ThemeContext>
  // directly as the Provider.
  return (
    <ThemeContext
      value={{
        theme,
        toggleTheme
      }}
    >

      {children}

    </ThemeContext>
  );
}


// ==================================================
// 4. CUSTOM HOOK
// ==================================================

export function useTheme() {

  const context =
    useContext(ThemeContext);


  // If ThemeProvider is missing,
  // show a clear error.
  if (context === null) {

    throw new Error(
      'useTheme must be used within a ThemeProvider'
    );

  }


  return context;
}