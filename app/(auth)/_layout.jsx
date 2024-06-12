import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
    return (
        <React.Fragment>
            <Stack>
                <Stack.Screen name='login' options={{ headerShown: false }} />
            </Stack>
        </React.Fragment>
    )
}

export default AuthLayout