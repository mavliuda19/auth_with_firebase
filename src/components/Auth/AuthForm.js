import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { authContext } from '../../store/authContext'
import { SECRET_KEY } from '../../utils/constants/general'
import classes from './AuthForm.module.css'

const AuthForm = () => {
	const history = useHistory()
	const authCtx = useContext(authContext)
	const emailInputRef = useRef()
	const passwordInputRef = useRef()
	const nameInputRef = useRef()
	const [isLogin, setIsLogin] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState('')

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState)
	}

	const submitHandler = (e) => {
		e.preventDefault()
		const enteredEmail = emailInputRef.current.value
		const enteredPassword = passwordInputRef.current.value
		const enteredName = nameInputRef.current.value
		nameInputRef.current.value = ''
		emailInputRef.current.value = ''
		passwordInputRef.current.value = ''
		setIsLoading(true)
		let url
		if (isLogin) {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${SECRET_KEY}`
			fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					name: enteredName,
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken: true,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => {
					setIsLoading(false)
					if (response.ok) {
						setMessage('signed in successfully')
						return response.json()
					} else {
						response.json().then((data) => {
							let errorMessage = 'Authentication failed'
							if (data && data.error && data.error.message) {
								errorMessage = data.error.message
							}
							setMessage(errorMessage)
							throw new Error(errorMessage)
						})
					}
				})
				.then((data) => {
					authCtx.getName(enteredName)
					authCtx.login(data.idToken)
					history.replace('/')
				})
				.catch((err) => {
					console.log(err.message)
				})
		} else {
			url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${SECRET_KEY}`
			fetch(url, {
				method: 'POST',
				body: JSON.stringify({
					name: enteredName,
					email: enteredEmail,
					password: enteredPassword,
					returnSecureToken: true,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((response) => {
					setIsLoading(false)
					if (response.ok) {
						return response.json()
					} else {
						response.json().then((data) => {
							let errorMessage = 'Authentication failed'
							if (data && data.error && data.error.message) {
								errorMessage = data.error.message
							}
							throw new Error(errorMessage)
						})
					}
				})
				.then((data) => {
					authCtx.getName(enteredName)
					authCtx.login(data.idToken)
					history.replace('/')
				})
				.catch((err) => {
					console.log(err.message)
				})
		}
	}

	return (
		<>
			<h2 style={{ textAlign: 'center' }}>{message}</h2>
			<section className={classes.auth}>
				<h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
				<form onSubmit={submitHandler}>
					<div className={classes.control}>
						<label htmlFor='email'>Your Name</label>
						<input
							ref={nameInputRef}
							type='text'
							id='name'
							required
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor='email'>Your Email</label>
						<input
							ref={emailInputRef}
							type='email'
							id='email'
							required
						/>
					</div>
					<div className={classes.control}>
						<label htmlFor='password'>Your Password</label>
						<input
							ref={passwordInputRef}
							type='password'
							id='password'
							required
						/>
					</div>
					<div className={classes.actions}>
						{!isLoading && (
							<button>
								{isLogin ? 'Login' : 'Create Account'}
							</button>
						)}
						{isLoading && <p>Sending request...</p>}
						<button
							type='button'
							className={classes.toggle}
							onClick={switchAuthModeHandler}
						>
							{isLogin
								? 'Create new account'
								: 'Login with existing account'}
						</button>
					</div>
				</form>
			</section>
		</>
	)
}

export default AuthForm
