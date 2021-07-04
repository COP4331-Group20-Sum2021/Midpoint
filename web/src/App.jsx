import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Nav from './components/nav'
import About from './components/about'
import Signup from './components/signup'
import ForgotPassword from './components/forgotPassword'
import { AuthProvider } from './contexts/authContext'
import './styles/App.scss'

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/forgotpassword' component={ForgotPassword} />
        <Route path='/about' component={About} />
      </Router>
    </AuthProvider>
  )
}
