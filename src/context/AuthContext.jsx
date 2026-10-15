// createContext creates the shared auth context.
// useContext lets components use auth.
import {
  createContext,
  useContext
} from 'react';


// Our custom localStorage hook.
import useLocalStorage from '../hooks/useLocalStorage.jsx';


// ==================================================
// 1. CREATE AUTH CONTEXT
// ==================================================

const AuthContext = createContext();


// ==================================================
// 2. AUTH PROVIDER
// ==================================================

export function AuthProvider({ children }) {

  // Instead of useState,
  // we now use useLocalStorage.
  //
  // "user" = key in localStorage
  // null = default value when nobody is logged in
  const [user, setUser] =
    useLocalStorage('user', null);


  // ==================================================
  // LOGIN
  // ==================================================

  function login() {

    // For now this is a fake user.
    // Later this could come from a real API.
    const loggedInUser = {
      name: 'User'
    };


    // Save the user.
    //
    // Because setUser comes from useLocalStorage,
    // this also saves the user in localStorage.
    setUser(loggedInUser);

  }


  // ==================================================
  // LOGOUT
  // ==================================================

  function logout() {

    // null means:
    // nobody is logged in.
    setUser(null);

  }


  // ==================================================
  // PROVIDER
  // ==================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>
  );
}


// ==================================================
// 3. CUSTOM HOOK
// ==================================================

export function useAuth() {

  const context = useContext(AuthContext);


  if (!context) {

    throw new Error(
      'useAuth must be used within an AuthProvider'
    );

  }


  return context;
}