import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import style from '../styles/login.module.scss'

export default function Signup() {
  return (
    <>
      <img id={style.gmap} src='/googlemaps_3.png' alt='google maps' />
      <SignupForm />
    </>
  )
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  passwordConfim: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
})
function SignupForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '', passwordConfim: '' }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }) => {
        alert(values)
        resetForm()
      }}
      >
      {({ errors, touched }) => (
        <Form className={style.form}>
          <h1 className={style.title}>Midpoint Signup</h1>
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

          <div className={style.field}>
            <h2>Confirm Password</h2>
            <Field name='passwordConfim' type='password' />
            {errors.passwordConfim && touched.passwordConfim ? <p className={style.error}>{errors.passwordConfim}</p> : null}
          </div>

          <div className={style.btn}><button type='submit'>Signup</button></div>
          <div className={style.btn}><p>Already have an account? Login</p></div>
        </Form>
      )}
    </Formik>
  )
}
