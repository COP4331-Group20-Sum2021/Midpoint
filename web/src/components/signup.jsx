import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../contexts/authContext'
import style from '../styles/login.module.scss'
import { useState } from 'react'

export default function Signup() {
  return (
    <>
      <div className={style.background}>
        <SignupForm />
      </div>
    </>
  )
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  password: Yup.string().required('Required').min(6, ({ min }) => `Password must be at least ${min} characters`),
  passwordConfim: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
})
function SignupForm() {
  const { signup } = useAuth()
  const [clicked, setClicked] = useState(false)
  const [error, setError] = useState()

  return (
    <Formik
      initialValues={{ email: '', firstName: '', lastName: '', password: '', passwordConfim: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await signup(values.email, values.firstName, values.lastName, values.password)
          setClicked(true)
          setError(null)
          resetForm()
        } catch(e) {
          setError(e.message)
        }
      }}
      >
      {({ errors, touched }) => (
        <Form className={style.form}>
          <h1 className={style.title}>Midpoint Signup</h1>
          {clicked && <div className={style.verify}>
            <h2>Check your email to verify your account!</h2>
            <p>p.s. don't forget about your spam folder.</p>
          </div>}
          {!clicked && <>
            <div className={style.field}>
              <h2>Email</h2>
              <Field name='email' type='email' />
              {errors.email && touched.email ? <p className={style.error}>{errors.email}</p> : null}
            </div>

            <div className={style.field}>
              <h2>First Name</h2>
              <Field name='firstName' />
              {errors.firstName && touched.firstName ? <p className={style.error}>{errors.firstName}</p> : null}
            </div>

            <div className={style.field}>
              <h2>Last Name</h2>
              <Field name='lastName' />
              {errors.lastName && touched.lastName ? <p className={style.error}>{errors.lastName}</p> : null}
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
            <div className={style.btn}><Link to='/login'><p>Already have an account? Login</p></Link></div>

            {error &&
              <div className={style.field}>
                  <p className={style.error}>{error}</p>
              </div>
            }
          </>}
        </Form>
      )}
    </Formik>
  )
}
