import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { FaRegUser, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./EditProfile.module.css";

import { useFetchDataWithToken } from "../../hooks/useFetchDataWithToken"; // Importé el hook para obtener datos con token
import { IUser } from "../Gestion de Inversiones/GestionInversiones"; // Importé la interfaz IUser


const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
};

const fetchGoogleProfileImage = async (googleToken: string) => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${googleToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al obtener la imagen de Google");
    }

    const data = await response.json();
    return data.picture || null;
  } catch (error) {
    console.error("Error al obtener la imagen de Google:", error);
    return null;
  }
};

export default function EditProfile() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [isPro, setIsPro] = useState(false);
  const [isNameDisabled, setIsNameDisabled] = useState(true);
  const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isGoogleUser] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { data: user } = useFetchDataWithToken<IUser>(
    "https://h4-09-fintech-production.up.railway.app/api/auth/check-login"
  );

  useEffect(() => {
    if (user) {
      setUserName(`${user.name} ${user.lastName}`); // Actualizo el nombre completo
      setEmail(user.username || null); // Actualizo el correo electrónico
    }
  }, [user]); 


  useEffect(() => {
    const token = getCookie("authToken");
    const googleToken = getCookie("googleAuthToken");

    if (!token && !googleToken) {
      console.error("No se encontró el token de autorización.");
      return;
    }

    const fetchProfileImage = async () => {
      try {
        if (googleToken) {
          const googleProfileImage = await fetchGoogleProfileImage(googleToken);
          if (googleProfileImage) {
            setProfileImage(googleProfileImage);
          } else {
            setProfileImage(null);
          }
        } else {
          const response = await fetch(
            "https://h4-09-fintech-production.up.railway.app/api/user/profile-image",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!response.ok)
            throw new Error("Error al obtener la imagen de perfil");

          const data = await response.json();
          setProfileImage(data.imageUrl || null);
        }
      } catch (error) {
        console.error("Error al obtener la imagen de perfil:", error);
      }
    };

    fetchProfileImage();
  }, []);

  useEffect(() => {
    const token = getCookie("authToken");

    if (!token) {
      console.error("El token de autorización no está presente.");
      setError("No se encontró el token de autorización.");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "https://h4-09-fintech-production.up.railway.app/api/auth/check-login",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }

        const data = await response.json();
        setUserName(`${data.name} ${data.lastName}`);
      } catch (error) {
        console.error("Error de red:", error);
        setError("Error al obtener los datos del usuario.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleToggle = () => {
    setIsPro(!isPro);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.pageView}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>
          <button className={styles.buttonArrow} onClick={() => navigate(-1)}>
            <FaArrowLeft className={styles.icon} />
          </button>
          Datos financieros y personales
        </h1>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.profile}>
          <div className={styles.profilePictureContainer}>
            {profileImage ? (
              <img
                src={profileImage}
                alt="Foto de perfil"
                className={styles.profilePicture}
              />
            ) : (
              <FaRegUser className={styles.defaultIcon} />
            )}

            {!isGoogleUser && (
              <label htmlFor="imageUpload" className={styles.cameraIcon}>
                <FaCamera />
              </label>
            )}

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}
            />
          </div>

          <div className={styles.info}>
            <h3 className={styles.names}>{userName || "Cargando nombre..."}</h3>
          </div>
        </div>

        <div className={styles.cardcontainer}>
          <div className={styles.card}>
            <h3 className={styles.subtitle}>
              {isPro ? "Pro Plan" : "Free Plan"}
            </h3>
            <label className={styles.switch}>
              <input type="checkbox" checked={isPro} onChange={handleToggle} />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <h2 className={styles.subtitle}>Datos personales</h2>

        <div className={styles.formContainer}>
          <div className={styles.form}>
            <label htmlFor="name">Nombre completo *</label>
            <div className={styles.inputWithButton}>
              <input
                type="text"
                id="name"
                placeholder={userName || "Nombre completo"}
                value={userName || ""}
                onChange={handleNameChange}
                disabled={isNameDisabled}
                required
              />
              <button
                type="button"
                onClick={() => setIsNameDisabled(!isNameDisabled)}
                className={styles.editButton}
              >
                {isNameDisabled ? "Editar" : "Guardar"}
              </button>
            </div>

            <label htmlFor="email">Correo electrónico *</label>
            <div className={styles.inputWithButton}>
              <input
                type="email"
                id="email"
                placeholder={email || "Correo electrónico"}
                value={email || ""}
                onChange={handleEmailChange}
                required
                disabled
              />
            </div>

            <label htmlFor="password">Contraseña *</label>
            <div className={styles.inputWithButton}>
              <input
                type="password"
                id="password"
                placeholder="************"
                value={password || ""}
                onChange={handlePasswordChange}
                required
                disabled={isPasswordDisabled}
              />
              <button
                type="button"
                onClick={() => setIsPasswordDisabled(!isPasswordDisabled)}
                className={styles.editButton}
              >
                {isPasswordDisabled ? "Cambiar" : "Guardar"}
              </button>
            </div>
          </div>
        </div>

        <h2 className={styles.subtitle}>Tolerancia al riesgo</h2>

        <div className={styles.radiocontainer}>
          <div className={styles.radiobuttonscontainer}>
            <div className={styles.radiobuttons}>
              <div className={styles.radiobutton}>
                <h3 className={styles.subtitle}>Conservador:</h3>
                <input
                  type="radio"
                  id="conservador"
                  name="tolerancia"
                  value="conservador"
                  checked={selectedOption === "conservador"}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.radiobutton}>
                <h3 className={styles.subtitle}>Equilibrado:</h3>
                <input
                  type="radio"
                  id="equilibrado"
                  name="tolerancia"
                  value="equilibrado"
                  checked={selectedOption === "equilibrado"}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.radiobutton}>
                <h3 className={styles.subtitle}>Agresivo:</h3>
                <input
                  type="radio"
                  id="agresivo"
                  name="tolerancia"
                  value="agresivo"
                  checked={selectedOption === "agresivo"}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
