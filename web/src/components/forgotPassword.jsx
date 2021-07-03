import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import style from '../styles/login.module.scss'

export default function ForgotPassword() {
  return (
    <>
      <img id={style.gmap} src='/googlemaps_3.png' alt='google maps' />
      <ForgotPasswordForm />
    </>
  )
}

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required')
})
function ForgotPasswordForm() {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={ForgotPasswordSchema}
      onSubmit={async (values, { resetForm }) => {
        alert(values)
        resetForm()
      }}
      >
      {({ errors, touched }) => (
        <Form className={style.form}>
          <h1 className={style.title}>Midpoint Forgot Password</h1>
          <div className={style.field}>
            <h2>Email</h2>
            <Field name='email' type='email' />
            {errors.email && touched.email ? <p className={style.error}>{errors.email}</p> : null}
          </div>

          <div className={style.btn}><button type='submit'>Request</button></div>
        </Form>
      )}
    </Formik>
  )
}
