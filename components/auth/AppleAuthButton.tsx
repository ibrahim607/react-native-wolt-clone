import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const AppleAuthButton = () => {
    return (
        <TouchableOpacity style={styles.appleButton}>
            <Ionicons name="logo-apple" size={18} color="white" />
            <Text style={styles.appleButtonText}>Continue with Apple</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    appleButton: {
        backgroundColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 17,
        borderRadius: 12,
        gap: 4,
    },
    appleButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
})

export default AppleAuthButton