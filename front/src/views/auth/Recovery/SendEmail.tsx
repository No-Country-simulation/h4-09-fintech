import { useState } from "react";
import styles from "../Auth/auth.module.css";
import GoBackIcon from "../../../assets/icons/GoBackIcon";
import IupiSmallIcon from "../../../assets/icons/(iupi)/IupiSmallIcon";
import Spiner from "../../../components/spiner/Spiner";
import Modals from "../../../components/modal/Modals";
import axios from "axios";
import { baseUrl } from "../../../config/envs";
import { Link } from "react-router-dom";



export const SendEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailData, setemailData] = useState({
    email: ""
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setemailData((user) => ({
      ...user,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${baseUrl}/api/auth/send_reset_password`, emailData);
      // const token = response.data.token;
     
      // Cookies.set("authToken", token, { expires: 1 });
      // navigate("/dashboard");
      setModalMessage("Revisa tu correo para restablecer tu contraseña");
      setIsModalOpen(true);
      // navigate("/dashboard");
      // alert("Login exitoso");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
      } else {
        console.error(error);
      }
      // alert("Usuario o contraseña invalidos");
      setModalMessage("Usuario no registrado en la base de datos");
      setIsModalOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  return (
    <div className={styles.pageview}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Link to={"/auth"}>
            {" "}
            <GoBackIcon />{" "}
          </Link>
          <IupiSmallIcon />
        </div>
        <h5 className="body2">
          Ingresa tu correo electrónico para restablecer tu contraseña
        </h5>
        <div className={styles.labelInput}>
          <label htmlFor="email" className="inputLabel">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={emailData.email}
            onChange={handleChange}
            placeholder="ejemplo@mail.com"
          />
        </div>

        {isLoading ? (
          <button type="button" className={styles.buttonEnabled} disabled>
            <Spiner />
          </button>
        ) : (
          <button
            className={
              emailData.email === ""
                ? styles.buttonDisabled
                : styles.buttonEnabled
            }
            type="submit"
            disabled={emailData.email === ""}
          >
            Enviar
          </button>
        )}
        {/* <Link to="#">Olvidé mi contraseña</Link> */}
        <div className={styles.registerdiv}>
          <span>No tenés una cuenta? </span>
          <Link to="/auth/register">Registrate acá</Link>
        </div>
      </form>
      {isModalOpen && (
        <Modals
          isOpen={isModalOpen}
          title="Mensaje"
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
