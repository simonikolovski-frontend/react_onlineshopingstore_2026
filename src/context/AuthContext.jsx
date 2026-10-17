// createContext creates our Auth Context.
// useContext lets components read the Auth Context.
import {
  createContext,
  useContext
} from 'react';


// Our custom localStorage hook.
import useLocalStorage from '../hooks/useLocalStorage.jsx';


// ==================================================
// 1. CREATE THE AUTH CONTEXT
// ==================================================

// null is the fallback value.
//
// If a component tries to use AuthContext
// outside AuthProvider,
// the value will be null.
const AuthContext = createContext(null);


// ==================================================
// 2. AUTH PROVIDER
// ==================================================

export function AuthProvider({ children }) {

  // ==================================================
  // USER STATE
  // ==================================================

  // Read the saved user from localStorage.
  //
  // If there is no saved user,
  // start with null.
  const [user, setUser] =
    useLocalStorage('user', null);


  // ==================================================
  // LOGIN
  // ==================================================

  function login() {

    // Fake login for now.
    //
    // Later this could come
    // from a real backend.
    setUser({
      name: 'User'
    });

  }


  // ==================================================
  // LOGOUT
  // ==================================================

  function logout() {

    // Remove the logged-in user.
    setUser(null);

  }


  // ==================================================
  // 3. PROVIDE AUTH DATA
  // ==================================================

  // React 19 syntax:
  //
  // We use <AuthContext>
  // directly as the Provider.
  return (
    <AuthContext
      value={{
        user,
        login,
        logout
      }}
    >

      {children}

    </AuthContext>
  );
}


// ==================================================
// 4. CUSTOM AUTH HOOK
// ==================================================

export function useAuth() {

  // Read the nearest AuthContext value.
  const context =
    useContext(AuthContext);


  // If AuthProvider is missing,
  // show a clear error.
  if (context === null) {

    throw new Error(
      'useAuth must be used within an AuthProvider'
    );

  }


  // Return:
  //
  // user
  // login
  // logout
  return context;
}