import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location';

const LocationIndicator = ({ onLocationUpdate }) => {
    const [currentLocation, setCurrentLocation] = useState({
        latitude: '',
        longitude: ''
    });

    const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [fetchButton, setFetchButton] = useState(true);

    useEffect(() => {
        // checkPermission
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                setLocationPermissionGranted(true);
                checkLocationStatus();
            } else {
                setLocationPermissionGranted(false);
                Alert.alert('Location Permission', 'Location permission denied. App cannot function properly without it.');
            }
        })();

        // checkLocationStatus
        (async () => {
            let { status } = await Location.getProviderStatusAsync();
            if (status.locationServicesEnabled) {
                setLocationEnabled(true);
                getLocation();
            } else {
                setLocationEnabled(false);
                Alert.alert('Location Services', 'Location services are disabled. Please enable them to use the app.');
            }
        })();

    }, [onLocationUpdate])

    const getLocation = async () => {
        try {
            let location = await Location.getCurrentPositionAsync({});
            setCurrentLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
            if (onLocationUpdate) {
                onLocationUpdate({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });
            }
        } catch (error) {
            console.error('Error getting location:', error);
        }
    };

    const fetchEvent = () => {
        setFetchButton(!fetchButton);
        getLocation();
    };

    const refreshLocation = () => {
        setCurrentLocation({
            latitude: '',
            longitude: ''
        });
        setLocationEnabled(false);
    };

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Location Status</Text>
            <View style={styles.cardContent}>
                <View style={styles.row}>
                    <View style={locationPermissionGranted ? styles.active : styles.inActive}>
                        <Text style={styles.text}>Permission</Text>
                    </View>
                    <View style={locationEnabled ? styles.active : styles.inActive}>
                        <Text style={styles.text}>Location</Text>
                    </View>
                    <View style={(currentLocation.latitude && currentLocation.longitude) ? styles.active : styles.inActive}>
                        <Text style={styles.text}>Position</Text>
                    </View>
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity onPress={refreshLocation} style={styles.refreshButton}>
                        <Text style={styles.refreshButtonText}>Refresh Status</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={fetchEvent} style={styles.refreshButton}>
                        <Text style={styles.refreshButtonText}>Fetch Location</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default LocationIndicator

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
    },
    cardContent: {
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 12,
    },
    active: {
        backgroundColor: '#4caf50',
        padding: 8,
        borderRadius: 6,
    },
    inActive: {
        backgroundColor: '#f44336',
        padding: 8,
        borderRadius: 6,
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 12,
    },
    refreshButton: {
        backgroundColor: '#2196f3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 6,
    },
    refreshButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});