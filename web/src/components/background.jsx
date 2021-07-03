import style from '../styles/background.module.scss'

export default function Background() {
  return (
    <div className={style.background}>
        <img src='/maps.png' id={style.background} />
    </div>
  )
}