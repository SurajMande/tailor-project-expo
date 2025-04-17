import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Better icon set
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      {/* Left Side - Logo */}
      <Image
        source={require('../assets/images/logo.png')} // Replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Right Side - Help Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('OfflineOrderManagement')}>
        <Icon name="help-circle-outline" size={28} color="blue" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 40,
  },
});

export default NavBar;
