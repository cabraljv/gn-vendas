import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import api from '../services/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    async function loadStoragedData() {
      const tokenGet = localStorage.getItem('@gnvendas:token');
      const userGet = localStorage.getItem('@gnvendas:user');

      if (tokenGet && userGet) {
        api.defaults.headers.Authorization = `Bearer ${tokenGet}`;
        setUser(JSON.parse(userGet));
        setSigned(true);
      }
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async (email, password) => {
    const response = await api.post('/session', {
      email,
      password,
    });
    if (response.status === 201) {
      const { token: tokenGet, user: userGet } = response.data;
      localStorage.setItem('@gnvendas:token', tokenGet);
      localStorage.setItem('@gnvendas:user', JSON.stringify(userGet));
      api.defaults.headers.Authorization = `Bearer ${tokenGet}`;
      setUser(JSON.stringify(userGet));
      setSigned(true);
      return true;
    }
    return false;
  }, []);

  const signOut = useCallback(async () => {
    localStorage.clear();
    setUser(null);
    setSigned(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, signed }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used from within an AuthProvider');
  }

  return context;
}
