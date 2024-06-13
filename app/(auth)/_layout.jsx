import React from 'react'
import { Stack } from 'expo-router'
import { GlobalProvider } from '../../context/GlobalProvider'

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