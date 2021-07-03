import { Link } from 'react-router-dom'
import style from '../styles/nav.module.scss'

export default function Nav() {
  return (
    <nav className={style.nav}>
      <img src='/logo.png' id={style.navLogo} alt='logo' />
      <ul className={style.navItems}>
        <Link to='/' className={style.navItem}><li>Home</li></Link>
        <Link to='/about' className={style.navItem}><li>About</li></Link>
        <Link to='/signup' className={style.navItem}><li>Signup</li></Link>
      </ul>
    </nav>
  )
}
