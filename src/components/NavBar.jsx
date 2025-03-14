import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MenuIcon from 'react-native-vector-icons/Feather';
import DropdownIcon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importing a better dropdown icon
import { useNavigation } from '@react-navigation/native';

const NavBar = () => {

    const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      {/* Left Section - Location */}
      <TouchableOpacity style={styles.locationContainer}>
        <Text style={styles.locationLabel}>Location</Text>
        <View style={styles.locationInfo}>
          <Icon name="map-marker-alt" size={20} color="blue" />
          <Text style={styles.locationText}> New York, USA</Text>
          <DropdownIcon name="chevron-down" size={22} color="black" style={styles.dropdownIcon} />
        </View>
        {/* Underline */}
        <View style={styles.underline} />
      </TouchableOpacity>

      {/* Right Section - Three-Line Menu */}
      <TouchableOpacity 
      onPress={()=> navigation.navigate('BusinessCard')}
      >
        <MenuIcon name="menu" size={28} color="black" />
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
  locationContainer: {
    flexDirection: 'column',
  },
  locationLabel: {
    fontSize: 14,
    color: 'gray',
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  dropdownIcon: {
    marginLeft: 5, // Adjust spacing for a cleaner look
  },
  underline: {
    width: 70, // Adjust width as needed
    height: 1,
    backgroundColor: 'red',
    marginTop: 10,
    borderRadius: 2,
  },
});

export default NavBar;
