// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { User, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase'; // Adjust the import path as necessary

interface AuthContextType {
  currentUser: User | null;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
