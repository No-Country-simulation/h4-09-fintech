import styles from "./Navbar.module.css";
import { useLocation } from "react-router-dom";
import IupiSmallIcon from "../../assets/icons/(iupi)/IupiSmallIcon";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

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
              <Link to="/dashboard">
                <LuLayoutDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/gestion">
                <FaHandHoldingDollar />
                Gestión de inversiones
              </Link>
            </li>
            <li>
              <Link to="/community/forum">
                <FaPeopleGroup />
                Comunidad & Noticias
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <FaUser />
                Mi cuenta
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
