import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import Verify from '../verify'

export default function Protected({ component: Component, ...rest }) {
  const { user } = useAuth()

  return (
    <Route
      {...rest}
      render={props => {
        console.log(props.location.pathname)
        if (user && user.emailVerified) {
          return <Component {...props} />
        } else if (user && !user.emailVerified) {
          if (props.location.pathname === '/verify')
            return <Verify /> 
          else
            return <Redirect to='/verify' />
        } else {
          return <Redirect to='/login' />
        }
      }}
    >
    </Route>
  )
}
