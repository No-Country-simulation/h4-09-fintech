import styles from "./Profile.module.css";
import Card from "../../components/card/Card";
import { useState} from "react";
import { FaRegUser, FaCamera } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { TbWorld } from "react-icons/tb";
import { LuMoon } from "react-icons/lu";
import { RxExit } from "react-icons/rx";
import { baseUrl } from "../../config/envs";
import { useFetchDataWithToken } from "../../hooks/useFetchDataWithToken";
import { IUser } from "../Gestion de Inversiones/GestionInversiones";
import { useUser } from "../../contexts/UserContext";

const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((row) => row.startsWith(`${name}=`));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
};

export default function Profile() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const {logout,user} = useUser();

  // const { data: user } = useFetchDataWithToken<IUser>(
  //   `${baseUrl}/api/auth/check-login`
  // );

  // Imprime los datos del usuario y la URL de la imagen de perfil

  
  const handleLogout = () => {
      logout();
  }
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const token = getCookie("authToken");
      if (!token) {
        console.error("No se encontró el token de autorización.");
        return;
      }

      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const response = await fetch(
          "https://h4-09-fintech-production.up.railway.app/api/user/upload-image",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const data = await response.json();

        if (data.success) {
          setProfileImage(data.imageUrl);
        } else {
          console.error("Error al subir la imagen:", data.message);
        }
      } catch (error) {
        console.error("Error de red al subir la imagen:", error);
      }
    }
  };
  console.log(user);
  return (
    <div className={styles.pageView}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Mi cuenta</h1>

        <div className={styles.profile}>
          <div className={styles.profilePictureContainer}>
            {/* {profileImage ? (
              <img
                src={user?.profileImageUrl || profileImage}
                alt="Foto de perfil"
                className={styles.profilePicture}
              />
            ) : (
              <FaRegUser className={styles.defaultIcon} />
            )} */}
            {user && user?.url_photo ? (
              <img
                src={user.url_photo} // Usa la imagen subida o la del usuario
                alt="Foto de perfil"
                className={styles.profilePicture}
              />
            ) : (
              <FaRegUser className={styles.defaultIcon} />
            )}

            <label htmlFor="imageUpload" className={styles.cameraIcon}>
              <FaCamera />
            </label>

            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>

          <div className={styles.info}>
            <h3 className={styles.names}>
              {user ? `${user.name} ${user.lastName}` : "Cargando nombre..."}
            </h3>
          </div>
          <div className={styles.perfilFinanciero}>
          <h3 className={styles.subtitle}>
            Perfil financiero :{" "}
            <span>{user?.riskPreference || "Cargando..."}</span>
          </h3>
          </div>
        </div>

        <div className={styles.cardContainer}>
          <Card
            icon={<FaRegUser />}
            title="Datos financieros y personales"
            description="Modifique o complete sus datos"
            link="/editprofile"
          />
          <Card
            icon={<GoGear />}
            title="Configuración"
            description="Añade o prueba funciones para evitar vulnerabilidades"
            link="/configurations"
          />
          <h2 className={styles.subtitle}>Pantalla y acciones</h2>
          <Card
            icon={<TbWorld />}
            title="Idioma"
            description="Cambia toda la interfaz a tu idioma"
            link=""
          />
          <Card
            icon={<LuMoon />}
            title="Modo oscuro"
            description="Para facilitar la visualización de la pantalla"
            link=""
          />
          <Card
            icon={<RxExit />}
            title="Cerrar sesión"
            description="O permanecer conectado y cambiar de usuario"
            link="/"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}
