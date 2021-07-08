import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Nav from './components/nav'
import About from './components/about'
import Signup from './components/signup'
import ForgotPassword from './components/forgotPassword'
import { AuthProvider } from './contexts/authContext'
import ProtectedAccount from './components/protected/ProtectedAccount'
import Protected from './components/protected/Protected'
import './styles/App.scss'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Route exact path='/' component={Home} />
        <ProtectedAccount path='/login' component={Login} />
        <ProtectedAccount path='/signup' component={Signup} />
        <ProtectedAccount path='/forgotpassword' component={ForgotPassword} />
        <Protected path='/about' component={About} /> {/* Protected to see how it works */}
      </Router>
    </AuthProvider>
  )
}
