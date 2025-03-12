import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText, onFilterPress }) => {
  return (
    <View style={styles.container}>
      {/* Search Icon */}
      <Ionicons name="search" size={20} color="#7D7D7D" style={styles.icon} />

      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#7D7D7D"
      />

      {/* Filter Button */}
      <View style={styles.filterButton} onTouchEnd={onFilterPress}>
        <Feather name="sliders" size={20} color="#FFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: '85%',
    alignSelf: 'center',
    borderWidth: 1.5,  // Gray border
    borderColor: '#D1D5DB', // Light gray color
    marginVertical: 10, // Spacing from other elements
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  filterButton: {
    backgroundColor: '#2563EB', // Blue color
    borderRadius: 25,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default SearchBar;
