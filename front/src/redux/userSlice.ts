import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from './store'

// Define a type for the slice state
interface IUserState {
	//! aca agregar todo lo que requiera el usuario
	email: string
	username: string
	saldo: number
}

// Define the initial state using that type
const initialState: IUserState = {
	email: '',
	username: '',
	saldo: 0
}

export const userSlice = createSlice({
	name: 'user',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,

	reducers: {
		setUser: (state, action) => {
			state.email = action.payload.email
			state.username = action.payload.username
			state.saldo = action.payload.saldo
		},
		logout: (state) => {
			state.email = ''
			state.username = ''
			state.saldo = 0
		},
		setSaldo: (state, action) => {
			state.saldo = action.payload
		}
	}
})

export const { setUser, logout, setSaldo } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer
