import { Link, useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../contexts/authContext'
import style from '../styles/login.module.scss'

export default function Login() {
  return (
    <>
      <img id={style.gmap} src='/googlemaps_3.png' alt='google maps' />
      <LoginForm />
    </>
  )
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
})
function LoginForm() {
  const { login } = useAuth()
  const history = useHistory()

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }) => {
        const error = await login(values.email, values.password)
        if (error === -1) {
          alert('Failed to Login')
        } else {
          resetForm()
          history.push('/')
        }
      }}
      >
      {({ errors, touched }) => (
        <Form className={style.form}>
          <h1 className={style.title}>Midpoint Login</h1>
          <div className={style.field}>
            <h2>Email</h2>
            <Field name='email' type='email' />
            {errors.email && touched.email ? <p className={style.error}>{errors.email}</p> : null}
          </div>

          <div className={style.field}>
            <h2>Password</h2>
            <Field name='password' type='password' />
            {errors.password && touched.password ? <p className={style.error}>{errors.password}</p> : null}
          </div>

          <div className={style.btn}><button type='submit'>Login</button></div>
          <div className={style.btn}><Link to='/forgotpassword'><p>Forgot your password?</p></Link></div>
          <div className={style.btn}><Link to='/signup'><p>Don't have an account? Signup</p></Link></div>
        </Form>
      )}
    </Formik>
  )
}
