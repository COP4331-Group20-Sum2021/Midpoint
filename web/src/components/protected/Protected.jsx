import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'

export default function Protected({ component: Component, ...rest }) {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        if (user && user.emailVerified) {
          return <Component {...props} />
        } else if (user && !user.emailVerified) {
          return <Redirect to='/verify' />
        } else {
          return <Redirect to='/login' />
        }
      }}
    >
    </Route>
  )
}
