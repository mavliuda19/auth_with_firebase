import React, { useEffect, useState } from 'react'
export const authContext = React.createContext({
	name: '',
	token: '',
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
})
export const AuthContextProvider = (props) => {
	const [token, setToken] = useState(null)
	const [name, setName] = useState('')

	useEffect(() => {
		const initialToken = localStorage.getItem('@token-my-app')
		setToken(initialToken)
	}, [])

	const userIsLoggedIn = !!token
	const loginHandler = (token) => {
		setToken(token)
		localStorage.setItem('@token-my-app', token)
	}

	const logoutHandler = () => {
		setToken(null)
		localStorage.removeItem('@token-my-app')
	}
	const getNameHandler = (el) => {
		setName(el)
	}
	const contextValue = {
		name: name,
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
		getName: getNameHandler,
	}
	return (
		<authContext.Provider value={contextValue}>
			{props.children}
		</authContext.Provider>
	)
}
