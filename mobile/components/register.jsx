import React from 'react';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import { Formik } from 'formik';

export default function Register({ navigation }) {
    return (
        <Formik
            initialValues={{ email: '' }}
            onSubmit={values => console.log(values)}
        >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View style={style.container}>
                <View style={style.section}>
                    <Text style={style.fieldName}>Email</Text>
                    <TextInput
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        style={style.input}
                    />
                </View>
                <View style={style.section}>
                    <Text style={style.fieldName}>Password</Text>
                    <TextInput
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        style={style.input}
                    />
                </View>
                <View style={style.section}>
                    <Text style={style.fieldName}>Confirm Password</Text>
                    <TextInput
                        onChangeText={handleChange('passwordConfirm')}
                        onBlur={handleBlur('passwordConfirm')}
                        value={values.passwordConfirm}
                        style={style.input}
                    />
                </View>
                <View style={style.section}>
                    <Button style={style.submit} onPress={handleSubmit} title="Submit" />
                </View>
            </View>
        )}
        </Formik>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
    },
    section: {
        marginTop: 20,
    },
    input: {
        shadowColor: 'black',
        shadowOpacity: .1,
        shadowRadius: 5,
        borderRadius: 5,
        fontSize: 20,
    },
    fieldName: {
        fontSize: 20,
    },
    submit: {
        fontSize: 30,
        margin: 10,
        borderRadius: 5,
    }
});
