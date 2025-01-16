import styles from "./Navbar.module.css";

export default function Navbar() {
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

