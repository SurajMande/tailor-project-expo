import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText, onFilterPress, onSearchPress }) => {
  return (
    <View style={styles.container}>
      {/* Search Icon */}
      {/* <Ionicons name="search" size={20} color="#7D7D7D" style={styles.icon} /> */}

      {/* Search Input */}
      <TextInput
        style={styles.input}
        placeholder="Search for tailors..."
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#7D7D7D"
      />

      {/* Filter Button */}
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
        <Feather name="sliders" size={20} color="#FFF" />
      </TouchableOpacity>

      {/* Search Button with Violet Glow */}
      <TouchableOpacity style={styles.searchButton} onPress={onSearchPress}>
        <Ionicons name="search" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 6,
    width: '95%',
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    marginVertical: 10,
    backgroundColor: '#F9FAFB', // Light background for contrast
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
    backgroundColor: '#2563EB',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    elevation: 3, // Shadow for better UI
  },
  searchButton: {
    backgroundColor: '#6A5ACD',
    borderRadius: 25,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    elevation: 5, // Shadow effect for better UI
    shadowColor: '#8B5CF6', // Violet glow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
  },
});

export default SearchBar;
