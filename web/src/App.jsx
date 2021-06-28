import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './components/home'
import Login from './components/login'
import Nav from './components/nav'
import About from './components/about'
import './styles/App.scss'

export default function App() {
  return (
    <Router>
      <Nav />
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/about' component={About} />
    </Router>
  )
}
