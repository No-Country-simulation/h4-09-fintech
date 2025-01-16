import styles from "./Perfil.module.css";
import Card from "../../components/card/Card";
import { FaUser } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { TbWorld } from "react-icons/tb";
import { LuMoon } from "react-icons/lu";
import { RxExit } from "react-icons/rx";

export default function Home() {
  return (
    <>
      <h1 className={styles.title}>Mi cuenta</h1>
      
      <div className={styles.profile}>
        <FaUser className={styles.user} />
        <p>Nombre</p>
        <p>Correo</p>
        <button>conservador</button>
      </div>

      <Card
        icon={<FaRegUser />}
        title="Datos financieros y personales"
        description="Modifique o complete sus datos"
        arrow=""
      />
      <Card
        icon={<GoGear />}
        title="Configuracion"
        description="Añade o pruebe funciones para evitar vulnerabilidades"
        arrow=""
      />
      <h2>Pantalla y acciones</h2>
      <Card
        icon={<TbWorld />}
        title="Idioma"
        description="Cambia toda la interfaz a tu idioma"
        arrow=""
      />
      <Card
        icon={<LuMoon />}
        title="Modo oscuro"
        description="Para facilitar la visualizacion de la pantalla"
        arrow=""
      />
      <Card
        icon={<RxExit />}
        title="Cerrar sesion"
        description="O permanecer conectado y cambiar de usuario"
        arrow=""
      />
    </>
  );
}
