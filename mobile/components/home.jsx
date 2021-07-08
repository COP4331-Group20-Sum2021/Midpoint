import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Home({ item }) {
    return (
        <Text>Hello</Text>
    )
}


const styles = StyleSheet.create({
    item: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
    }
})