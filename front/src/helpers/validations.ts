import { IUserData } from '../views/auth/Register/Register'

const validatePassword = (password: string) => {
	// Regex que valida: al menos una minúscula, una mayúscula, un número, un carácter especial y longitud mínima de 8
	const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/
	return regexp.test(password)
}

export const validateRegister = (data: Partial<IUserData>, fieldName?: string) => {
	const errors: { [key: string]: string } = {}

	if (data.name !== undefined && data.name.trim() === '') {
		errors.name = 'El nombre es obligatorio'
	}

	if (data.lastName !== undefined && data.lastName.trim() === '') {
		errors.lastName = 'El apellido es obligatorio'
	}

	if (data.email !== undefined && !/^\S+@\S+\.\S+$/.test(data.email)) {
		errors.email = 'Correo inválido'
	}

	if (data.password !== undefined) {
		if (data.password.length < 8) {
			errors.password = 'La contraseña debe tener al menos 8 caracteres'
		} else if (!validatePassword(data.password)) {
			errors.password = 'La contraseña debe incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial'
		}
	}

	if (data.confirmPassword !== undefined && data.confirmPassword !== data.password) {
		errors.confirmPassword = 'Las contraseñas no coinciden'
	}

	// Excluir booleanos como `olderThan18`.

	// Retornar solo errores específicos si se pasa un campo
	if (fieldName) {
		return { [fieldName]: errors[fieldName] }
	}

	return errors
}
