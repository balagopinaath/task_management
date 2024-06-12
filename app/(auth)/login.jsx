import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { tw } from 'nativewind'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Perform login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <View className="flex-1 w-full items-center justify-center bg-primary">
            <View className="px-4 w-11/12 max-w-sm rounded-lg bg-background p-6 shadow-lg">
                <Text className="text-4xl font-bold mb-6 text-primary">Login</Text>

                <View className="flex flex-col gap-4">
                    <TextInput
                        className="border border-secondary px-4 py-2 rounded-md w-full bg-white"
                        placeholder="Enter phone number"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        className="border border-secondary px-4 py-2 rounded-md w-full bg-white"
                        placeholder="Enter password"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <View className="mt-6">
                    <Button title="Login" color="#22e0d7" onPress={handleLogin} />
                </View>
            </View>
        </View>
    )
}

export default Login