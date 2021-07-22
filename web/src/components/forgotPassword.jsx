import { Formik, Form, Field } from 'formik'
import { useState } from 'react'
import * as Yup from 'yup'
import { useAuth } from '../contexts/authContext'
import style from '../styles/login.module.scss'

export default function ForgotPassword() {
  return (
    <>
      <div className={style.background}>
        <ForgotPasswordForm />
      </div>
    </>
  )
}

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required')
})
function ForgotPasswordForm() {
  const { resetPassword } = useAuth()
  const [clicked, setClicked] = useState(false)

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={ForgotPasswordSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await resetPassword(values.email)
          setClicked(true)
          resetForm()
        } catch(e) {
          alert(e)
        }
      }}
    >
      {({ errors, touched }) => (
        <Form className={style.form}>
          <h1 className={style.title}>Midpoint Forgot Password</h1>
          {clicked && <div className={style.verify}>
            <h2>Check your email to reset your password!</h2>
            <p>p.s. don't forget about your spam folder.</p>
          </div>}
          {!clicked && <>
            <div className={style.field}>
              <h2>Email</h2>
              <Field name='email' type='email' />
              {errors.email && touched.email ? <p className={style.error}>{errors.email}</p> : null}
            </div>
            <div className={style.btn}><button type='submit'>Request</button></div>
          </>
          }
        </Form>
      )}
    </Formik>
  )
}
