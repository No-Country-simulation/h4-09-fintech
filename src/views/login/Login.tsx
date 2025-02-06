import { useState } from 'react';
import styles from '../login/login.module.css';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import SlashEyeIcon from '../../assets/icons/SlashEyeIcon';
import Eyeicon from '../../assets/icons/Eyeicon';
import Spinner from '../../components/Spiner';
import IupiSmallIcon from '../../assets/icons/IupiSmallIcon';

export default function Login() {
  const navigate = useNavigate();
  const { loading, login } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setLoginData((user) => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await login(loginData);
  };

  return (
    <div className={styles.pageview}>
      <form
        className={`${styles.registerForm} shadow-xl rounded-md border border-gray-400`}
        onSubmit={handleSubmit}
      >
        <div className="flex  justify-between w-full">
          <h5 className="body2">Panel de Administración</h5>
          <IupiSmallIcon />
        </div>
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
              type={showPassword ? 'text' : 'password'}
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
        {loading ? (
          <button type="button" className={styles.buttonEnabled} disabled>
            <Spinner />
          </button>
        ) : (
          <button
            className={`bg-blue-500 ${
              loginData.email === '' || loginData.password === ''
                ? styles.buttonDisabled
                : styles.buttonEnabled
            } `}
            type="submit"
            disabled={loginData.email === '' || loginData.password === ''}
          >
            Iniciar sesión
          </button>
        )}
      </form>
    </div>
  );
}
