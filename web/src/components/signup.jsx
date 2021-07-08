import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../contexts/authContext'
import style from '../styles/login.module.scss'
import { useState } from 'react'

export default function Signup() {
  return (
    <>
      <div id={style.background} />
      <SignupForm />
    </>
  )
}

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  passwordConfim: Yup.string().required('Required').oneOf([Yup.ref('password'), null], 'Passwords must match')
})
function SignupForm() {
  const { signup } = useAuth()
  const [clicked, setClicked] = useState(false)

  return (
    <Formik
      initialValues={{ email: '', password: '', passwordConfim: '' }}
      validationSchema={SignupSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await signup(values.email, values.password)
          setClicked(true)
        } catch(e) {
          alert('Failed to Signup: ' + e)
        }
        resetForm()
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
          </>}
        </Form>
      )}
    </Formik>
  )
}
