// import React from 'react'
// import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store.ts'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleClientId } from './config/envs.ts'


createRoot(document.getElementById('root')!).render(
	<>
		<Provider store={store}>
			<GoogleOAuthProvider clientId={GoogleClientId}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</GoogleOAuthProvider>
		</Provider>
	</>
)
