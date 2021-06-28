import { Link } from 'react-router-dom'
import style from '../styles/nav.module.scss'

export default function Nav() {
  return (
    <nav className={style.nav}>
      <img src='/logo.png' id={style.navLogo} />
      <ul className={style.navItems}>
        <Link to='/' className={style.navItem}><li>Home</li></Link>
        <Link to='/about' className={style.navItem}><li>About</li></Link>
        <Link to='/login' className={style.navItem}><li>Login</li></Link>
      </ul>
    </nav>
  )
}
