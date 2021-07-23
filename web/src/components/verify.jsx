import style from '../styles/Verify.module.scss'

export default function Verify() {
  return (
    <div className={style.container}>
      <h1>Please verify your accout through your email to get started.</h1>
      <p>If you have verifed your account and are still being redirected, refresh the page.</p>
    </div>
  )
}
