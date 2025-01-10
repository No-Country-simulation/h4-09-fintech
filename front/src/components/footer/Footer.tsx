import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <p>&copy; 2025 iUpi. Todos los derechos reservados.</p>
        </div>
        <div className={styles.footerCenter}>
          <ul className={styles.footerLinks}>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Sobre nosotros</a></li>
            <li><a href="#">Contáctanos</a></li>
            <li><a href="#">Política de privacidad</a></li>
          </ul>
        </div>
        <div className={styles.footerRight}>
          <p>Síguenos en:</p>
          <ul className={styles.socialLinks}>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
