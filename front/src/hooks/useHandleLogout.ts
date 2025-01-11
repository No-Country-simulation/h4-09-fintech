import { googleLogout } from '@react-oauth/google'
import { logout } from '../redux/userSlice'
import { useAppDispatch } from '../redux/storehooks'

// funcion que hace logout y lo borra del estado global y localstorage
export const useHandlelogout = () => {
	const dispatch = useAppDispatch()
	dispatch(logout())
	localStorage.removeItem('user')
	googleLogout()
}
