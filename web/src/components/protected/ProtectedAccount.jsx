import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

export default function ProtectedAccount({ component: Component, ...rest }) {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        return !user ? <Component {...props} /> : <Redirect to='/' />
      }}
    >
    </Route>
  )
}
