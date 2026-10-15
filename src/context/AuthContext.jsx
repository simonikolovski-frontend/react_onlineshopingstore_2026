// createContext creates the shared auth context.
// useContext lets components use auth.
// useState stores the current user.
import {
  createContext,
  useContext,
  useState
} from 'react';


// ==================================================
// 1. CREATE AUTH CONTEXT
// ==================================================

const AuthContext = createContext();


// ==================================================
// 2. AUTH PROVIDER
// ==================================================

export function AuthProvider({ children }) {

  // null means:
  // nobody is logged in.
  const [user, setUser] = useState(null);


  // ==================================================
  // LOGIN
  // ==================================================

  function login() {

    // For now we use a simple fake user.
    // Later this could come from an API.
    const loggedInUser = {
      name: 'User'
    };


    setUser(loggedInUser);

  }


  // ==================================================
  // LOGOUT
  // ==================================================

  function logout() {

    // null means no logged-in user.
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