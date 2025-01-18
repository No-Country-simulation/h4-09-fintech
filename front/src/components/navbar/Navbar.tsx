import { useState } from "react";
import styles from "./Navbar.module.css";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const location = useLocation(); // Obtiene la ubicación actual
  const pathname = location.pathname; // Obtiene el pathname

  if (
    pathname === "/" ||
    pathname === "/onboarding" ||
    pathname.includes("/auth")
  ) {
    return null;
  }

  return (
    <div className={styles.root}>
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <a href="#">iUpi</a>
        </div>
        <nav className={styles.menu}>
          <ul className={styles.navMenu}>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="#">Gestión de inversiones</a>
            </li>
            <li>
              <a href="#">Comunidad & Noticias</a>
            </li>
            <li>
              <a href="#">Mi cuenta</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
