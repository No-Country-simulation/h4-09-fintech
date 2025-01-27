import axios from 'axios'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie' // Asegúrate de tener instalado js-cookie

type Data<T> = T | null
export type ErrorType = Error | null

interface Params<T> {
	data: Data<T>
	loading: boolean
	error: ErrorType
}

export const useFetchDataWithToken = <T>(url: string): Params<T> => {
	const [data, setData] = useState<Data<T>>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<ErrorType>(null)

	useEffect(() => {
		setLoading(true)

		const fetchData = async () => {
			try {
				// Obtener el token desde las cookies
				const token = Cookies.get('authToken')

				// Configurar el encabezado de autorización si el token existe
				const headers = token ? { Authorization: `Bearer ${token}` } : undefined

				// Realizar la solicitud con los headers
				const response = await axios.get(url, { headers })
				const jsonData: T = response.data
				console.log(jsonData)

				setData(jsonData)
				setError(null)
			} catch (err) {
				setError(err as Error)
				console.log(err)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [url])

	return { data, loading, error }
}
