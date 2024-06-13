import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, router } from 'expo-router'
import { useGlobalContext } from '../../context/GlobalProvider';
import AntDesign from '@expo/vector-icons/AntDesign';

const HomeLayout = () => {
    const { user, setUser, setIsLogged } = useGlobalContext();

    const logout = async () => {
        setUser(null);
        setIsLogged(false);
        router.replace("/login")
    }

    return (
        <React.Fragment>
            <Stack>
                <Stack.Screen
                    name='home'
                    options={{
                        headerTitle: () => (
                            <React.Fragment>
                                <View className="flex-row justify-between items-center px-4 py-2">
                                    <View>
                                        <Text className="text-base font-bold">
                                            {user ? `Welcome, ${user.user.Name}` : 'Welcome Guest!'}
                                        </Text>
                                        <Text className="text-sm text-gray-600">
                                            {user
                                                ? `Login Time: ${new Date(user.sessionInfo.InTime).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`
                                                : 'Nil'
                                            }
                                        </Text>
                                    </View>
                                    <TouchableOpacity className="ml-auto px-40" onPress={logout}>
                                        <AntDesign name="logout" size={24} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </React.Fragment>
                        )
                    }}
                />
            </Stack>
        </React.Fragment>
    )
}

export default HomeLayout