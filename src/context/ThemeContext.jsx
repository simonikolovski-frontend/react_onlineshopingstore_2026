// createContext creates our shared theme.
// useContext lets components use the theme.
// useState stores dark/light.
// useEffect changes the class on the body.
import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';


// ==================================================
// 1. CREATE CONTEXT
// ==================================================

const ThemeContext = createContext();


// ==================================================
// 2. THEME PROVIDER
// ==================================================

export function ThemeProvider({ children }) {

  // App starts in dark mode.
  const [theme, setTheme] = useState('dark');


  // ==================================================
  // CHANGE THE THEME
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
  // APPLY THE THEME TO THE BODY
  // ==================================================

  useEffect(() => {

    // Remove old theme classes first.
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