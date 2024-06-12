import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const Welcome = () => {
    return (
        <View className="flex-1 justify-center items-center bg-primary">
            <StatusBar style='auto' />
            <Text className="text-3xl text-white mb-8">Task Management</Text>
            <Link href="/login" asChild>
                <Pressable>
                    <Text className="text-black mb-8">Get Started</Text>
                </Pressable>
            </Link>
        </View>
    )
}

export default Welcome