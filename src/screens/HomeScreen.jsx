import React, { useState } from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import RecommendationComponent from '../components/Recommendations';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerText}>Find, Book & Get Styled by Top Tailors!</Text>
        <SearchBar 
          value={searchQuery} 
          onChangeText={setSearchQuery} 
          onFilterPress={() => console.log("Filter pressed")} 
        />
        <RecommendationComponent />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1, // Ensures SafeAreaView takes the full height of the screen
    backgroundColor: '#fff', // Optional: Set background color
    marginTop: 30,
  },
  scrollContainer: {
    paddingHorizontal: 15, // Ensures consistent spacing from screen edges
    paddingBottom: 20, // Adds spacing at the bottom to prevent content cutoff
  },
  headerText: {
    fontSize: 35, // Increases text size
    fontWeight: 'bold', // Makes it bold
    textAlign: 'center', // Centers the text
    color: '#222', // Dark gray color for better contrast
    marginBottom: 15, // Adds space below the text
  },
});

export default HomeScreen;