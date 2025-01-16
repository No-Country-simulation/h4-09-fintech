import { useState } from 'react'
import styles from './Navbar.module.css'
import { useLocation } from 'react-router-dom'

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false)

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	const location = useLocation() // Obtiene la ubicación actual
	const pathname = location.pathname // Obtiene el pathname

	if (pathname === '/' || pathname === '/onboarding' || pathname.includes('/auth')) {
		return null
	}

	return (
		<div className={styles.root}>
			<header className={styles.navbar}>
				<div className={styles.logo}>
					<a href='#'>iUpi</a>
				</div>
				<nav className={styles.menu}>
					<button className={`${styles.navMobile} ${menuOpen ? styles.navOpen : ''}`} onClick={toggleMenu}>
						<span></span>
						<span></span>
						<span></span>
					</button>
					<ul className={`${styles.navMenu} ${menuOpen ? styles.openMenu : ''}`}>
						<li>
							<a href='#'>Inicio</a>
						</li>
						<li>
							<a href='#'>Ingresos</a>
						</li>
						<li>
							<a href='#'>Gastos</a>
						</li>
						<li>
							<a href='#'>Objetivos</a>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	)
}
