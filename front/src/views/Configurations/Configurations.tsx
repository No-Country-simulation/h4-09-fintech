import styles from "./Configurations.module.css";
import Card from "../../components/card/Card";
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaBalanceScaleRight } from "react-icons/fa";
import { TbBrandCashapp } from "react-icons/tb";
import { BsGraphUpArrow } from "react-icons/bs";



export default function Configurations() {

  return (
    <>
      <div className={styles.container}>
      <h1 className={styles.title}>
          {" "}
          <a href="profile">
            <FaArrowLeft />
          </a>
          Configuración{" "}
        </h1>
          
          <div className="">

          
        <Card
          icon={<IoMdNotificationsOutline /> }
          title="Preferencias de notificaciones"
          description="Mensajes, alertas, objetivos y sugerencias"
          arrow=""
        />
        <Card
          icon={<FaRegCreditCard /> }
          title="Tarjeta de crédito"
          description="Ingresa tu tarjeta de crédito y debito preferida"
          arrow=""
        />
        <h2 className={styles.subtitle}>Visualizaciones financieras</h2>
        <Card
          icon={<FaBalanceScaleRight />}
          title="Balance general"
          description="CRevision de activos, pasivos y patrimonio neto"
          arrow=""
        />
        <Card
          icon={<TbBrandCashapp />}
          title="Objetivos financieros"
          description="Revision de progreso, plazos y prioridades definidas"
          arrow=""
        />
        <Card
          icon={<BsGraphUpArrow /> }
          title="Ahorros"
          description="Automatiza, adecua tus metas y optimiza"
          arrow=""
        />
        </div>
      </div>
    </>
  );
}
