import React from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    password: yup
        .string()
        .min(6, ({ min }) => `Password must be at least ${min} characters`)
        .required('Password is required'),
    passwordConfirm: yup
        .string()
        .required('Required')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

export default function Register({ navigation }) {
    const { signup } = useAuth()
    const [clicked, setClicked] = useState(false)

    return (
        <Formik
            initialValues={{ email: '', password: '', passwordConfirm: '' }}
            validationSchema={loginSchema}
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
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid}) => (
            <View style={style.container}>
                {!clicked && <>
                    <View style={style.section}>
                        <Text style={style.fieldName}>Email</Text>
                        <TextInput
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            style={style.input}
                        />
                        {(errors.email && touched.email) && <Text style={style.error}>{errors.email}</Text>}
                    </View>
                    <View style={style.section}>
                        <Text style={style.fieldName}>Password</Text>
                        <TextInput
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            style={style.input}
                        />
                        {(errors.password && touched.password) && <Text style={style.error}>{errors.password}</Text>}
                    </View>
                    <View style={style.section}>
                        <Text style={style.fieldName}>Confirm Password</Text>
                        <TextInput
                            onChangeText={handleChange('passwordConfirm')}
                            onBlur={handleBlur('passwordConfirm')}
                            value={values.passwordConfirm}
                            style={style.input}
                        />
                        {(errors.passwordConfirm && touched.passwordConfirm) && <Text style={style.error}>{errors.passwordConfirm}</Text>}
                    </View>
                    <View style={style.section}>
                        <Button style={style.submit} onPress={handleSubmit} title="Submit" />
                    </View>
                </>
                }
                {clicked && <>
                    <View style={style.verifyContainer}>
                        <Text style={style.verify}>Check your email to verify your account!</Text>
                        <Text style={style.verify}>p.s. don't forget about your spam folder.</Text>
                    </View>
                </>}
            </View>
        )}
        </Formik>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 10,
    },
    section: {
        width: '90%',
        marginTop: 20,
    },
    input: {
        shadowColor: 'black',
        shadowOpacity: .1,
        shadowRadius: 5,
        borderRadius: 5,
        fontSize: 20,
        padding: 5,
    },
    fieldName: {
        fontSize: 20,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
    submit: {
        fontSize: 30,
        margin: 10,
        borderRadius: 5,
    },
    verifyContainer: {
        marginTop: 10,
        textAlign: 'center',
    },
    verify: {
        fontSize: 18,
        color: 'blue',
    }
});
