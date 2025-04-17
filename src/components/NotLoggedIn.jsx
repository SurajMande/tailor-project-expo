import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from "../services/storageService";

const NotLoggedIn = () => {
    const navigation = useNavigation();

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            
            const user = await getUserData(); 
            if (user) {
                if (user.accountType === 'Tailor') {
                    navigation.navigate('TailorManagement');
                } else {
                    navigation.navigate('CustomerManagement');
                }
            }
        };

        checkUserLoggedIn();
    }, [navigation]);

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackIcon}>
                    <Text style={styles.goBackText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Not Logged In</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.message}>You are not signed in.</Text>
                <Button title="Login" onPress={handleLogin} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    goBackIcon: {
        marginRight: 8,
    },
    goBackText: {
        fontSize: 18,
        color: '#007AFF',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 16,
        marginBottom: 16,
    },
});

export default NotLoggedIn;