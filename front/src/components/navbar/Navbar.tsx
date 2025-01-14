import { useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.root}>
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <a href="#">iUpi</a>
        </div>
        <nav className={styles.menu}>
          <button
            className={`${styles.navMobile} ${menuOpen ? styles.navOpen : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
          <ul
            className={`${styles.navMenu} ${menuOpen ? styles.openMenu : ""}`}
          >
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <a href="#">Ingresos</a>
            </li>
            <li>
              <a href="#">Gastos</a>
            </li>
            <li>
              <a href="#">Objetivos</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
