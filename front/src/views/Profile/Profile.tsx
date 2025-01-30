import styles from "./Profile.module.css";
import Card from "../../components/card/Card";
// import IupiSmallIcon from "../../assets/icons/IupiSmallIcon";
import { useState, useEffect } from "react";
import { FaRegUser, FaCamera } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { TbWorld } from "react-icons/tb";
import { LuMoon } from "react-icons/lu";
import { RxExit } from "react-icons/rx";
import { baseUrl } from "../../config/envs"
import { useFetchDataWithToken } from "../../hooks/useFetchDataWithToken"
import { IUser } from "../Gestion de Inversiones/GestionInversiones"
// import { GiReceiveMoney } from "react-icons/gi";

export default function Profile() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  // const [riskPreference, setRiskPreference] = useState<string | null>(null);
  const { data: user } = useFetchDataWithToken<IUser>(`${baseUrl}/api/auth/check-login`)
  // const [userName, setUserName] = useState<string | null>();


  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/api/auth/check-login");
  //       if (response.ok) {
  //         const data = await response.json();
  //         setUserName(`${data.name} ${data.lastName}`);
  //         setRiskPreference(data.riskPreference);
  //       } else {
  //         console.error("Error al obtener los datos del usuario");
  //       }
  //     } catch (error) {
  //       console.error("Error de red:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // **Cargar imagen inicial desde el backend**
  useEffect(() => {
    const fetchProfileImage = async () => {
      const response = await fetch(
        "http://localhost:5000/api/user/profile-image"
      );
      const data = await response.json();
      setProfileImage(data.imageUrl || null); // Si no hay imagen, queda como `null`.
    };
    fetchProfileImage();
  }, []);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("url", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setProfileImage(data.imageUrl);
      } else {
        console.error("Error al subir la imagen:", data.message);
      }
    }
  };

  return (
    <div className={styles.pageView}>
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Mi cuenta</h1>

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
            <h3 className={styles.names}>{user ? `${user.name} ${user.lastName}` : "Cargando nombre..."}</h3>
            {/* <p className={styles.email}>Correo</p> */}
          </div>

          {/* <button className={styles.button}> */}
            {/* <IupiSmallIcon />|<GiReceiveMoney /> */}
            {/* {user?.riskPreference || "Cargando..."} */}
          {/* </button> */}

          <h3 className={styles.subtitle}>Perfil financiero : <span>{user?.riskPreference || "Cargando..." }</span></h3>
        </div>

        <Card
          icon={<FaRegUser />}
          title="Datos financieros y personales"
          description="Modifique o complete sus datos"
          link="/editprofile"
        />
        <Card
          icon={<GoGear />}
          title="Configuracion"
          description="Añade o pruebe funciones para evitar vulnerabilidades"
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
          description="Para facilitar la visualizacion de la pantalla"
          link=""
        />
        <Card
          icon={<RxExit />}
          title="Cerrar sesion"
          description="O permanecer conectado y cambiar de usuario"
          link="/"
        />
      </div>
    </div>
  );
}
