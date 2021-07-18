import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

export default function ProtectedAccount({ component: Component, ...rest }) {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        if (user)
          return !user.emailVerified ? <Component {...props} /> : <Redirect to='/' />
        return <Component {...props} />
      }}
    >
    </Route>
  )
}
