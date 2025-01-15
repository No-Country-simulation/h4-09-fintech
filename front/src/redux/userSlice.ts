import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'
// import type { RootState } from './store'

// Define a type for the slice state
interface IUserState {
	//! aca agregar todo lo que requiera el usuario
	email: string
	name: string
	lastname: string
	mainGoal: string
	riskPreference: string
	financialKnowledge: string
}

// Define the initial state using that type
const initialState: IUserState = {
	email: '',
	name: '',
	lastname: '',
	mainGoal: '',
	riskPreference: '',
	financialKnowledge: ''
}

export const userSlice = createSlice({
	name: 'user',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,

	reducers: {
		setUser: (state, action) => {
			state.email = action.payload.email
			state.name = action.payload.name
			state.lastname = action.payload.lastname
			state.mainGoal = action.payload.mainGoal
			state.riskPreference = action.payload.riskPreference
			state.financialKnowledge = action.payload.financialKnowledge
		},
		logout: (state) => {
			state.email = ''
			state.name = ''
		}
	}
})

export const { setUser, logout } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default userSlice.reducer
