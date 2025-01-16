import axios from 'axios'
import { useState } from 'react'
import Cookies from 'js-cookie'

type Data<T> = T | null
export type ErrorType = Error | null

interface Params<T> {
	data: Data<T>
	loading: boolean
	error: ErrorType
	patchData: (body: unknown) => Promise<void>
}

export const usePatchDataWithToken = <T>(url: string): Params<T> => {
	const [data, setData] = useState<Data<T>>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<ErrorType>(null)

	// Función para realizar la solicitud POST
	const patchData = async (body: unknown) => {
		setLoading(true)
		setError(null)

		try {
			// Obtener el token desde las cookies
			const token = Cookies.get('authToken')

			// Configurar los encabezados
			const headers = token ? { Authorization: `Bearer ${token}` } : undefined

			// Realizar la solicitud POST
			const response = await axios.patch(url, body, { headers })
			const jsonData: T = response.data
			console.log(jsonData)

			setData(jsonData)
		} catch (err) {
			setError(err as Error)
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return { data, loading, error, patchData }
}
