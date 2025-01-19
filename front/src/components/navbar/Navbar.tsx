import styles from "./Navbar.module.css";
import { useLocation } from "react-router-dom";
import IupiSmallIcon from "../../assets/icons/IupiSmallIcon";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const location = useLocation(); 
  const pathname = location.pathname;

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
          <IupiSmallIcon />
        </div>
        <nav className={styles.menu}>
          <ul className={styles.navMenu}>
            <li>
              <a href="#">
                <LuLayoutDashboard />
                Dashboard
              </a>
            </li>
            <li>
              <a href="#">
                <FaHandHoldingDollar />
                Gestión de inversiones
              </a>
            </li>
            <li>
              <a href="#">
                <FaPeopleGroup />
                Comunidad & Noticias
              </a>
            </li>
            <li>
              <a href="#">
                <FaUser />
                Mi cuenta
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
