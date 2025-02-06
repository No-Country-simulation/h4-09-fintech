import { useState } from "react";
import styles from "../Auth/auth.module.css";
import GoBackIcon from "../../../assets/icons/GoBackIcon";
import IupiSmallIcon from "../../../assets/icons/(iupi)/IupiSmallIcon";
import Spiner from "../../../components/spiner/Spiner";
import Modals from "../../../components/modal/Modals";
import axios from "axios";
import { baseUrl } from "../../../config/envs";
import { Link } from "react-router-dom";
import Eyeicon from "../../../assets/icons/Eyeicon";
import SlashEyeIcon from "../../../assets/icons/SlashEyeIcon";

export const RecoveryPassword = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordData, setpasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setpasswordData((user) => ({
      ...user,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${baseUrl}/api/auth/reset_password`, passwordData/* , {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } */);

      // const token = response.data.token;

      // Cookies.set("authToken", token, { expires: 1 });
      // navigate("/dashboard");
      setModalMessage("Ingerasa tu nueva contraseña");
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
      setModalMessage("Contrasenas no coinciden o no cumplen con los requisitos");
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
          <label htmlFor="password">Contraseña</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              id="passwordLogin"
              name="password"
              required
              value={passwordData.password}
              onChange={handleChange}
              placeholder="*******"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={styles.showPasswordButton}
            >
              {showPassword ? <Eyeicon /> : <SlashEyeIcon />}
            </button>
          </div>
          {errors.password && (
            <small style={{ color: "red", textWrap: "wrap" }}>
              {errors.password}
            </small>
          )}
        </div>

        <div className={styles.labelInput}>
          <label htmlFor="confirmPassword">Confirmar contraseña</label>
          <div className={styles.passwordContainer}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              required
              value={passwordData.confirmPassword}
              onChange={handleChange}
              placeholder="*******"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className={styles.showPasswordButton}
            >
              {showConfirmPassword ? <Eyeicon /> : <SlashEyeIcon />}
            </button>
          </div>
          {errors.confirmPassword && (
            <small style={{ color: "red" }}>{errors.confirmPassword}</small>
          )}
        </div>

        {isLoading ? (
          <button type="button" className={styles.buttonEnabled} disabled>
            <Spiner />
          </button>
        ) : (
          <button
            className={
              passwordData.password === "" ||
              passwordData.confirmPassword === ""
                ? styles.buttonDisabled
                : styles.buttonEnabled
            }
            type="submit"
            disabled={
              passwordData.password === "" ||
              passwordData.confirmPassword === ""
            }
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
