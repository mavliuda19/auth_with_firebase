import { useContext } from 'react'
import { authContext } from '../store/authContext'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

function PrivateRoute({ children, ...rest }) {
	const authCtx = useContext(authContext)
	return (
		<Route
			{...rest}
			render={() => {
				return authCtx.isLoggedIn === true ? (
					children
				) : (
					<Redirect to='/auth' />
				)
			}}
		/>
	)
}
export default PrivateRoute
