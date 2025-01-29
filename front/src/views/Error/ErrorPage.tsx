import React from 'react';
import styles from './ErrorPage.module.css';
import ErrorIcon from "../../assets/icons/ErrorIcon"
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div className={styles.container}>
        <ErrorIcon/>
        <h1 className={styles.title}>¡Faltan datos importantes!</h1>
        <p className={styles.subtitle}>Necesitamos que la informacion sea ingresada en tu cuenta en la seccion datos personales para mejorar tu experiencia</p>
        <Link to="/" className={styles.backButton}>Ir a datos financieros y personales</Link>
      </div>
  );
};

export default ErrorPage;

