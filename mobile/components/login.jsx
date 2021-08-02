import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

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
                    <Button 
                        buttonStyle={style.loginButton}
                        title='Login'
                        onPress={handleSubmit}
                    />
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
    loginButton: {
        backgroundColor: '#9FB3D1',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'black'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: '#2A3C6B'
    },
    section: {
        width: '90%',
        padding: 20,
        backgroundColor: '#9FB3D1',
        shadowColor: "black",
        shadowOpacity: .1,
        shadowRadius: 5,
    },
    input: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: .1,
        shadowRadius: 5,
        borderRadius: 5,
        fontSize: 20,
        padding: 10,
    },
    fieldName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
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
