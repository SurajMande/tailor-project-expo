import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const RecommendationComponent = () => {
  // Static JSON data
  const tailors = [
    {
      name: 'Rajesh Tailors',
      specialization: 'Bespoke Suits & Sherwanis',
      location: 'Mumbai, India',
      image: 'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Elegant Stitches',
      specialization: 'Women’s Ethnic Wear',
      location: 'Delhi, India',
      image: 'https://images.pexels.com/photos/6205514/pexels-photo-6205514.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Modern Fit Tailors',
      specialization: 'Men’s Formal & Wedding Wear',
      location: 'Bangalore, India',
      image: 'https://images.pexels.com/photos/6610994/pexels-photo-6610994.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Classic Stitch',
      specialization: 'Casual & Daily Wear',
      location: 'Kolkata, India',
      image: 'https://images.pexels.com/photos/6205517/pexels-photo-6205517.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Heritage Handloom',
      specialization: 'Handcrafted & Traditional Wear',
      location: 'Jaipur, India',
      image: 'https://images.pexels.com/photos/6205520/pexels-photo-6205520.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  const navigation = useNavigation();

  const categories = ["Both", "Men's Wear", "Women's Wear"];
  const [selectedCategory, setSelectedCategory] = useState("Both");

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Tailors Near You</Text>
        <View style={styles.underline} />
      </View>

      {/* Scrollable Categories */}
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.category,
              selectedCategory === item && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(item)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.selectedCategoryText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 5 }}
      />

      {/* Tailors List */}
      <FlatList
        data={tailors}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card} >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.serviceTitle}>{item.name}</Text>
              <Text style={styles.specialization}>{item.specialization}</Text>
              <View style={styles.locationRow}>
                <Text style={styles.location}>{item.location}</Text>
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('TailorProfile')}>
                  <Text style={styles.buttonText}>View Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  header: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  underline: {
    width: 50,
    height: 3,
    backgroundColor: '#007AFF',
    marginTop: 5,
    borderRadius: 2,
  },
  category: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#555',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginHorizontal: 8,
    width: 280,
    overflow: 'hidden',
    elevation: 4,
    paddingBottom: 15,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  specialization: {
    fontSize: 14,
    color: '#4C6EF5',
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  location: {
    fontSize: 13,
    color: '#777',
    flex: 1,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default RecommendationComponent;
