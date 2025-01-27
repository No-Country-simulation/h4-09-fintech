import { useLocation } from "react-router-dom";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareReddit } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";

export default function Footer() {
  const location = useLocation(); // Obtiene la ubicación actual
  const pathname = location.pathname; // Obtiene el pathname

  if (pathname === "/") {
    return null;
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <p>&copy; 2025 iUpi. Todos los derechos reservados.</p>
        </div>
        <div className={styles.footerCenter}>
          <ul className={styles.footerLinks}>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/">Acerca de nosotros</Link>
            </li>
            <li>
              <Link to="/">Comunidad</Link>
            </li>
            <li>
              <Link to="/">Soporte</Link>
            </li>
            <li>
              <Link to="/">Privacidad</Link>
            </li>
            <li>
              <Link to="/">Terminos y condiciones</Link>
            </li>
          </ul>
        </div>
        <div className={styles.footerRight}>
          <p>Síguenos en:</p>
          <ul className={styles.socialLinks}>
            <li>
              <Link to="/">
                <FaFacebookSquare />
                Facebook
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaSquareXTwitter />
                Twitter
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaInstagram />
                Instagram
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaSquareReddit />
                Reddit
              </Link>
            </li>
            <li>
              <Link to="/">
                <FaYoutube />
                Youtube
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
