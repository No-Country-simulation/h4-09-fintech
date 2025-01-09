import { IUserData } from '../views/auth/Register/Register'

export function validateRegister(userData: IUserData, fieldName?: string) {
	const errors: Partial<IUserData> = {}

	if ((!fieldName || fieldName === 'username') && !userData.username.trim()) {
		errors.username = 'El nombre de usuario es obligatorio.'
	} else if (userData.username.length < 3) {
		errors.username = 'El nombre de usuario debe tener al menos 3 caracteres.'
	}

	if ((!fieldName || fieldName === 'email') && !userData.email.trim()) {
		errors.email = 'El correo electrónico es obligatorio.'
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
		errors.email = 'El correo electrónico no es válido.'
	}

	if ((!fieldName || fieldName === 'password') && !userData.password.trim()) {
		errors.password = 'La contraseña es obligatoria.'
	} else if (userData.password.length < 6) {
		errors.password = 'La contraseña debe tener al menos 6 caracteres.'
	}

	return errors
}
