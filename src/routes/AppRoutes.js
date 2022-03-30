import React from 'react'
import UserProfile from '../components/Profile/UserProfile'
import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage'
import { Redirect } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

const AppRoutes = () => {
	return (
		<div>
			<Switch>
				<Route path='/' exact>
					<HomePage />
				</Route>
				<Route path='/auth'>
					<AuthPage />
				</Route>
				<PrivateRoute path='/profile'>
					<UserProfile />
				</PrivateRoute>
				<Route path='*'>
					<Redirect to='/' />
				</Route>
			</Switch>
		</div>
	)
}

export default AppRoutes
