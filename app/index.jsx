import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../context/GlobalProvider'

const Welcome = () => {
    const { loading, isLogged } = useGlobalContext()

    if (!isLogged && loading) {
        return <Redirect href="/home" />;
    }

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{
                height: "100%",
            }}>
                <View className="w-full flex justify-center items-center h-full px-4">
                    <Text className="text-3xl text-white font-bold text-center">Task Management</Text>
                    < Link href="/login" asChild >
                        <Pressable className="w-full justify-center items-center mt-7">
                            <Text className="text-black mb-8">Get Started</Text>
                        </Pressable>
                    </Link >
                </View>

            </ScrollView>
        </SafeAreaView >
    )
}

export default Welcome