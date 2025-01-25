import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { baseUrl } from "../config/envs";

// Tipos para los datos del usuario y el contexto
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

// Crear el contexto con un valor inicial
const UserContext = createContext<UserContextType | undefined>(undefined);

// Función para obtener el token desde las cookies
const getTokenFromCookies = (): string | null => {
  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("authToken="));
  return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
};

// Tipos para las props del proveedor
interface UserProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    const token = getTokenFromCookies();
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/api/auth/check-login`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwic3ViIjoiYm1AbWFpbC5jb20iLCJpYXQiOjE3Mzc3NjUxNDMsImV4cCI6MTczNzc2ODc0M30.tpMTDzzH5vE1jtr87q2yF0XZ76OGRy_X3BW0BLy5zIo`,
        },
      });

      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData);
        console.log("Datos del usuario:", userData); // Esto mostrará los datos que recibes de la API.
      } else {
        // console.error(
        //   "Error al obtener los datos del usuario:",
        //   response.status
        // );
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para usar el contexto
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
}
