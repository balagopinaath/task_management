import { View, Text, Button, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SecureStore from 'expo-secure-store'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'
import EndPoint from '../../constants/EndPoint'
import * as Location from 'expo-location';
import LocationIndicator from '../../components/LocationIndicator'

const HomeScreen = () => {
    const { user, setUser, setIsLogged } = useGlobalContext()
    const [userData, setUserData] = useState(null);
    const [attendance, setAttendance] = useState(null);
    const [lastAttendance, setLastAttendance] = useState({});

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    useEffect(() => {
        (async () => {
            try {
                const data = await SecureStore.getItemAsync('userData');
                if (data) {
                    const parsedData = JSON.parse(data);
                    setUserData(parsedData);
                    fetchLastAttendance(parsedData.user.UserId);
                }
            } catch (err) {
                console.log('Error retrieving user data:', err);
            }
        })()
    }, [])

    const fetchLastAttendance = async (id) => {
        console.log(`${EndPoint.getLastAttendance}${id}`)
        fetch(`${EndPoint.getLastAttendance}${id}`)
            .then(res => res.json())
            .then(data => {
                if (data?.success && data?.data?.length > 0) {
                    // console.log(data.data[0])
                    setLastAttendance(data?.data[0])
                }
            })
    }

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })()
    }, [])

    const handleStartDay = () => {
        fetch(EndPoint.attendance, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                UserId: user.user.UserId,
                Latitude: location.coords.latitude,
                Longitude: location.coords.longitude,
            })
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    ToastAndroid.show(data.message, ToastAndroid.LONG)
                    // toast.success(data.message)
                } else {
                    ToastAndroid.show(data.message, ToastAndroid.LONG)
                }
            })
    };

    const handleEndDay = () => {
        fetch(EndPoint.attendance, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Id: lastAttendance.Id,
                Description: 'Mobile Testing'
            })
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    ToastAndroid.show(data.message, ToastAndroid.LONG)
                    // toast.success(data.message)
                } else {
                    ToastAndroid.show(data.message, ToastAndroid.LONG)
                }
            })
    };


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} className="bg-primary">
            <Text>Location Indicator</Text>
            <LocationIndicator />
            {errorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
            {location && (
                <View>
                    <Text>Latitude: {location.coords.latitude}</Text>
                    <Text>Longitude: {location.coords.longitude}</Text>
                </View>
            )}

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Day Tracking</Text>
                <View style={styles.timeContainer}>
                    <TouchableOpacity onPress={handleStartDay} style={styles.button}>
                        <Text style={styles.buttonText}>Start Day</Text>
                    </TouchableOpacity>
                    <Text style={styles.timeText}>{startTime ? `Start Time: ${startTime}` : 'Start Time: Not Started'}</Text>
                </View>
                <View style={styles.timeContainer}>
                    <TouchableOpacity onPress={handleEndDay} style={styles.button}>
                        <Text style={styles.buttonText}>End Day</Text>
                    </TouchableOpacity>
                    <Text style={styles.timeText}>{endTime ? `End Time: ${endTime}` : 'End Time: Not Ended'}</Text>
                </View>
            </View>




        </View>
    )
}

export default HomeScreen


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: '80%',
        alignSelf: 'center',
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        textAlign: 'center',
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    button: {
        backgroundColor: '#2196f3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    timeText: {
        fontSize: 16,
    },
});