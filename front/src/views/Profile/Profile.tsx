
// import { baseUrl } from '../../config/envs'
// import { useFetchDataWithToken } from '../../hooks/useFetchDataWithToken'
// import { IUser } from '../Gestion de Inversiones/utils'
import styles from "./Profile.module.css";
import Card from "../../components/card/Card";
import { useEffect, useState} from "react";
import { FaRegUser, FaCamera } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { TbWorld } from "react-icons/tb";
import { LuMoon } from "react-icons/lu";
import { RxExit } from "react-icons/rx";
import { useUser } from "../../contexts/UserContext";
import axios from "axios";
import Spinner from "../../components/spiner/Spiner";


const getCookie = (name: string): string | null => {
	const cookies = document.cookie.split('; ')
	const cookie = cookies.find((row) => row.startsWith(`${name}=`))
	return cookie ? decodeURIComponent(cookie.split('=')[1]) : null
}

export default function Profile() {

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const {logout, user,setUser} = useUser();
  const [loading,setLoading] = useState<boolean>(false);

  useEffect(()=> {
    setProfileImage(user?.profileImageUrl || null);
  },[])
  
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
      formData.append("file", selectedFile);

      try {
        setLoading(true);
        const response = await axios.patch(
          "https://h4-09-fintech-production.up.railway.app/api/user/upload-image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data", // Importante para enviar archivos
            },
          }
        );
          setProfileImage(response.data);
          console.log(response.data)
          setUser({...user!,profileImageUrl:response.data})
      } catch (error) {
        console.error("Error de red al subir la imagen:", error);
      }finally{
        setLoading(false);
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

          {
            loading ? (<div className={styles.spinnerContainer}>
              <Spinner/>
            </div>) : (
              (user && user?.profileImageUrl ) && profileImage ? (
                <img
                  src={profileImage}
                  alt="Foto de perfil"
                  className={styles.profilePicture}
                />
              ) : (
                <FaRegUser className={styles.defaultIcon} />
              )
            )
          }


						<label htmlFor='imageUpload' className={styles.cameraIcon}>
							<FaCamera />
						</label>

						<input id='imageUpload' type='file' accept='image/*' onChange={handleImageChange} style={{ display: 'none' }} />
					</div>

					<div className={styles.info}>
						<h3 className={styles.names}>{user ? `${user.name} ${user.lastName}` : 'Cargando nombre...'}</h3>
					</div>
					<div className={styles.perfilFinanciero}>
						<h3 className={styles.subtitle}>
							Perfil financiero : <span>{user?.riskPreference || 'Cargando...'}</span>
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
