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
import Verify from './components/verify'
import './styles/App.scss'
import MyProfile from './components/myprofile'
<<<<<<< HEAD
import Groups from './components/groups'
import Invitations from './components/invitations'
=======
import GroupRender from './components/groups'
>>>>>>> 03da1c7164a23f0cc48f2e9f1548502cb1a6202a

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Route exact path='/' component={Home} />
        <ProtectedAccount path='/login' component={Login} />
        <ProtectedAccount path='/signup' component={Signup} />
        <ProtectedAccount path='/forgotpassword' component={ForgotPassword} />
        <Route path='/about' component={About} />
        <Protected path='/myprofile' component={MyProfile} />
<<<<<<< HEAD
        <Protected path='/groups' component={Groups} />
        <Protected path='/invitations' component={Invitations} />
=======
        <Protected path='/groups' component={GroupRender} />
>>>>>>> 03da1c7164a23f0cc48f2e9f1548502cb1a6202a
        <Protected path='/verify' component={Verify} />
      </Router>
    </AuthProvider>
  )
}
