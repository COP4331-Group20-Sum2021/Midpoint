import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

export default function Protected({ component: Component, ...rest }) {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return (user && user.emailVerified) ? <Component {...props} /> : <Redirect to='/verify' />
      }}
    >
    </Route>
  )
}
