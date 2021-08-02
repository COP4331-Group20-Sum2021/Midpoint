import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("Please enter valid email")
        .required('Email Address is Required'),
    password: yup
        .string()
        .required('Password is required'),
})

export default function Login({ navigation }) { 
    const { login } = useAuth()
    const [error, setError] = useState()

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={async (values, { resetForm }) => {
                const error = await login(values.email, values.password)
                if (error === -1) {
                    setError('Invalid Credentials')
                } else {
                    setError(null)
                    resetForm()
                    navigation.navigate('Home')
                }
            }}
        >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
            <View style={style.container}>
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
                        secureTextEntry
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        style={style.input}
                    />
                    {(errors.password && touched.password) && <Text style={style.error}>{errors.password}</Text>}
                </View>
                <View style={style.section}>
                    <Button style={style.submit} onPress={handleSubmit} title="Login" />
                </View>
                {error &&
                    <View style={style.section}>
                        <Text style={style.error}>{error}</Text>
                    </View>
                }
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
});
