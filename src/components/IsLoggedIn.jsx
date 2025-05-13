import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserData } from "../services/storageService";
import Header from './Header';

const IsLoggedIn = () => {
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
            <Header 
            navigation={navigation}
            name= "Not Logged In"
            />
            <View style={styles.content}>
                <Text style={styles.message}>You are not signed in.</Text>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.button}>Login</Text>
                </TouchableOpacity>
                <Text style={styles.message}>or</Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.button}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    button: {
        backgroundColor: '#003BFF',
        color: '#fff',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        fontSize: 16,
        fontWeight: 'semibold',
    },
});

export default IsLoggedIn;