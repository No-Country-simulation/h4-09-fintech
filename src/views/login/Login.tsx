import { useState } from 'react';
import styles from '../login/login.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import { baseUrl } from '../../config/envs';
import { useUser } from '../../context/UserContext';
import SlashEyeIcon from '../../assets/icons/SlashEyeIcon';
import Eyeicon from '../../assets/icons/Eyeicon';
import Spinner from '../../components/Spiner';
import IupiSmallIcon from '../../assets/icons/IupiSmallIcon';

export default function Login() {
  const navigate = useNavigate();
  const { fetchUserData } = useUser(); // Destructura setUser del contexto
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
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
      const response = await axios.post(`${baseUrl}/api/admin/auth/login`, loginData);
      const token = response.data.token;

      Cookies.set('authToken', token, { expires: 1 });
      await fetchUserData();
      navigate('/dashboard');
      alert('Login exitoso');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
      } else {
        console.error(error);
      }
      alert('Usuario o contraseña invalidos');
    } finally {
      setIsLoading(false);
    }
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
        {isLoading ? (
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
