import React from 'react';
import styles from './ErrorPage.module.css';

const ErrorPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.errorBox}>
        <h1 className={styles.errorTitle}>404</h1>
        <p className={styles.errorMessage}>Oops! La página que buscas no existe.</p>
        <p className={styles.subMessage}>Parece que algo salió mal. Pero no te preocupes, ¡podemos solucionarlo!</p>
        <a href="/" className={styles.backButton}>Regresar al inicio</a>
      </div>
    </div>
  );
};

export default ErrorPage;

