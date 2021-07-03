import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
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
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }) => {
        alert(values)
        resetForm()
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
          <div className={style.btn}><p>Forgot your password?</p></div>
        </Form>
      )}
    </Formik>
  )
}
