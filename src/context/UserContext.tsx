import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { baseUrl } from '../config/envs';
import Cookies from 'js-cookie';
import api from '../utils/axios';
// Tipos para los datos del usuario y el contexto
interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  roleName: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  decifrado: (token: string) => User;
  fetchUserData: () => Promise<void>;
  logout: () => void;
}

// Crear el contexto con un valor inicial
const UserContext = createContext<UserContextType | undefined>(undefined);

// Función para obtener el token desde las cookies
const getTokenFromCookies = (): string | null => {
  const cookies = document.cookie.split('; ');
  const tokenCookie = cookies.find((cookie) => cookie.startsWith('authToken='));
  return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1]) : null;
};

// Tipos para las props del proveedor
interface UserProviderProps {
  children: ReactNode;
}
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
}
// Proveedor del contexto
export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    setLoading(true);
    const token = getTokenFromCookies();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get<User>(`${baseUrl}/api/admin/auth/login/check-login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data);
    } catch (error) {
      console.error('Error en la solicitud:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    Cookies.remove('authToken');
    setUser(null);
    setLoading(false);
  };
  const decifrado = (token: string): User => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload) as User;
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, decifrado, fetchUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para usar el contexto
