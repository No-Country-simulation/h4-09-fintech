import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/storehooks'
import { logout, setUser } from '../../redux/userSlice'
import { Link } from 'react-router-dom'

export default function Home() {
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

	//funcion que hace logout y lo borra del estado global y localstorage
	const handlelogout = () => {
		dispatch(logout())
		localStorage.removeItem('user')
	}

	return (
		<div style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
			{/* <p style={{ fontSize: '2em', color: 'red' }}>{`usuario: ${user.email} email: ${user.username}`}</p>
		<p style={{ fontSize: '2em', color: 'red' }}>{`saldo: ${user.saldo}`}</p> */}

			<p>
				<Link to='/auth/login'>login</Link>
			</p>
			<p>
				<Link to='/auth/register'>register</Link>
			</p>

			<button type='button' onClick={handlelogout}>
				logout
			</button>
		</div>
	)
}
