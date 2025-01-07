import { logout, setUser } from '../../redux/userSlice'
import { useAppDispatch, useAppSelector } from '../../redux/storehooks'
import { useEffect } from 'react'

export default function Login() {
	//usar esto para obtener el estado global user
	const dispatch = useAppDispatch()
	const user = useAppSelector((state) => state.user)
	console.log(user)

	//uso esto para ver si hay un usuario en el localstorage
	useEffect(() => {
		const user = localStorage.getItem('user')
		if (user) {
			dispatch(setUser(JSON.parse(user)))
		}
	}, [dispatch])

	//funcion que hace login y lo guarda en estado global y localstorage
	const handlelogin = () => {
		dispatch(setUser({ email: 'email@mail', username: 'nombreusuario' }))
		localStorage.setItem('user', JSON.stringify({ email: 'email@mail', username: 'nombreusuario' }))
	}

	//funcion que hace logout y lo borra del estado global y localstorage
	const handlelogout = () => {
		dispatch(logout())
		localStorage.removeItem('user')
	}

	return (
		<div style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
			<h1>Login</h1>

			<p style={{ fontSize: '2em', color: 'red' }}>{`usuario: ${user.email} email: ${user.username}`}</p>

			<button type='button' onClick={handlelogin}>
				login
			</button>
			<button type='button' onClick={handlelogout}>
				logout
			</button>

			<p>
				<a href='/register'>register</a>
			</p>
			<p>
				<a href='/'>home</a>
			</p>
		</div>
	)
}
