import { View, Text, TextInput, Button, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import EndPoint from '../../constants/EndPoint';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const Login = () => {
    const { setUser, setIsLogged } = useGlobalContext()
    const [isSubmitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        mobile: "",
        password: "",
    });

    const handleLogin = async () => {
        const { mobile, password } = form
        setSubmitting(true);

        try {
            const response = await fetch(EndPoint.login, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    {
                        "username": mobile,
                        "password": password,
                    }
                ),
            });

            const data = await response.json()

            if (data.success) {
                setUser(data);
                setIsLogged(true)
                await SecureStore.setItemAsync('userData', JSON.stringify(data));
                setForm({ mobile: '', password: '' });
                ToastAndroid.show(data.message, ToastAndroid.LONG);
                router.replace("/home");
            } else {
                ToastAndroid.show(data.message, ToastAndroid.LONG);
            }
        } catch (err) {
            console.log(err)
            ToastAndroid.show(err.message, ToastAndroid.LONG);
        } finally {
            setSubmitting(false);
        }
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
                        onChangeText={(value) => setForm({ ...form, mobile: value })}
                        value={form.mobile}
                    />
                    <TextInput
                        className="border border-secondary px-4 py-2 rounded-md w-full bg-white"
                        placeholder="Enter password"
                        placeholderTextColor="#999"
                        secureTextEntry
                        onChangeText={(value) => setForm({ ...form, password: value })}
                        value={form.password}
                    />

                    <View className="mt-6">
                        <Button title="Login" color="#22e0d7" onPress={handleLogin} disabled={isSubmitting} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Login