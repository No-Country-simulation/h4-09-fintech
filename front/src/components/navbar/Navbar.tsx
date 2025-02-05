import styles from "./Navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import IupiSmallIcon from "../../assets/icons/(iupi)/IupiIconNavbar";
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
              <NavLink to="/dashboard">
                <LuLayoutDashboard />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/gestion">
                <FaHandHoldingDollar />
                Gestión de inversiones
              </NavLink>
            </li>
            <li>
              <NavLink to="/community">
                <FaPeopleGroup />
                Comunidad & Noticias
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                <FaUser />
                Mi cuenta
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
