import { useState } from "react";
import styles from "../Auth/auth.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../../../config/envs";
import Spiner from "../../../components/spiner/Spiner";
import Cookies from "js-cookie";
import { useUser } from "../../../contexts/UserContext"; // Importa el hook useUser
import GoBackIcon from "../../../assets/icons/GoBackIcon";
import IupiSmallIcon from "../../../assets/icons/(iupi)/IupiSmallIcon";
import Eyeicon from "../../../assets/icons/Eyeicon";
import SlashEyeIcon from "../../../assets/icons/SlashEyeIcon";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser(); // Destructura setUser del contexto
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setLoginData((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/api/auth/login`, loginData);
      const token = response.data.token;
      const user = response.data.user; // Asegúrate de obtener los datos del usuario
      Cookies.set("authToken", token, { expires: 1 });

      // Aquí actualizas el contexto con los datos del usuario
      setUser(user); // Enviar los datos del usuario al contexto

      navigate("/dashboard");
      alert("Login exitoso");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
      } else {
        console.error(error);
      }
      alert("Usuario o contraseña invalidos");
    } finally {
      setIsLoading(false);
    }
  };

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
          Logueate y continúa el camino hacia tu libertad financiera.
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
            value={loginData.email}
            onChange={handleChange}
            placeholder="ejemplo@mail.com"
          />
        </div>
        <div className={styles.labelInput}>
          <label htmlFor="password" className="inputLabel">
            Contraseña
          </label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              id="passwordLogin"
              name="password"
              required
              value={loginData.password}
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
        </div>
        {isLoading ? (
          <button type="button" className={styles.buttonEnabled} disabled>
            <Spiner />
          </button>
        ) : (
          <button
            className={
              loginData.email === "" || loginData.password === ""
                ? styles.buttonDisabled
                : styles.buttonEnabled
            }
            type="submit"
            disabled={loginData.email === "" || loginData.password === ""}
          >
            Iniciar sesión
          </button>
        )}
        <Link to="#">Olvidé mi contraseña</Link>
        <div className={styles.registerdiv}>
          <span>No tenés una cuenta? </span>
          <Link to="/auth/register">Registrate acá</Link>
        </div>
      </form>
    </div>
  );
}
